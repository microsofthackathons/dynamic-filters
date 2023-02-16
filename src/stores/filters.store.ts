import { makeAutoObservable, runInAction } from 'mobx';
import { inject } from 'react-ioc';
import { Filter, FilterItem, FilterParam, FiltersService } from '../services';

export class FiltersStore {
  private filtersService: FiltersService = inject(this, FiltersService);

  private state: State = {
    metadata: [] as Filter[],
    data: {} as FilterViewModel,
    loading: false,
  };

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
    this.read();
  }

  async read() {
    this.state.loading = true;
    try {
      const filters = await this.filtersService.apiClient.getFilters();
      runInAction(() => {
        this.state.metadata = filters;

        this.state.metadata.forEach(filter => {
          const selectedOptions = filter.options?.filter(option => option.selected) ?? [];
          this.state.data[filter.name] = {
            value: filter.options ?? [],
            selectedOptions: selectedOptions.map(option => option.value),
            text: selectedOptions.map(option => option.text).join(', '),
          };
        });

        this.state.error = undefined;
      });
    } catch (error) {
      runInAction(() => {
        this.state.error = 'Error loading filters';
        console.error(error);
      });
    } finally {
      this.state.loading = false;
    }
  }

  get filtersMetadata(): Filter[] {
    return this.state.metadata;
  }

  get filters(): FilterViewModel {
    return this.state.data;
  }

  setSelectedOptions(currentFilter: string, selectedOptions: string[]) {
    this.state.data[currentFilter].selectedOptions = selectedOptions;

    //TODO: Find dependent filters and load try to load their data
    const dependentFilters = this.state.metadata.filter(filter => filter.dependencies?.includes(currentFilter));

    //TODO: For dependent filters, if all dependencies are selected, load data
    dependentFilters.forEach(filter => {
      const allDependenciesSelected = filter.dependencies?.every(
        dependency => this.state.data[dependency].selectedOptions.length > 0
      );
      
      if (allDependenciesSelected) {
        const filterParams =  filter.dependencies?.map(dependency => ({
           name: dependency,
           value: this.state.data[dependency].selectedOptions,
        })) ?? [];
        
        this.loadFilterData(filter.name, filterParams);
      }
    });
  }

  private async loadFilterData(filterName: string, filterParams: FilterParam[]) {
    this.state.loading = true;
    try {
      const filterData = await this.getFilterOptions(filterName, filterParams);
      runInAction(() => {
        this.state.data[filterName].value = filterData;
        this.state.error = undefined;
      });
    } catch (error) {
      runInAction(() => {
        this.state.error = 'Error loading filter data';
        console.error(error);
      });
    } finally {
      this.state.loading = false;
    }
  }

  async getFilterOptions(filterName: string, filterParams: FilterParam[]) {
    return this.filtersService.apiClient.getFilter(filterParams, { params: { name: filterName } });
  }
}

interface State {
  metadata: Filter[];
  data: FilterViewModel;
  loading: boolean;
  error?: string;
}

interface FilterViewModel {
  [key: string]: { value: FilterItem[]; selectedOptions: string[]; text?: string };
}
