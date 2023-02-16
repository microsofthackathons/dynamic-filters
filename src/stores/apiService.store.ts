import { makeAutoObservable, runInAction } from 'mobx';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { inject } from 'react-ioc';
import { GlobalSettingsStore } from './globalSettings.store';

interface ApiServiceState {
  axiosInstance: AxiosInstance;
}

export class ApiServiceStore {
  private appSettingsDataStore = inject(this, GlobalSettingsStore);

  private state: ApiServiceState = {
    axiosInstance: axios.create({
      baseURL: this.appSettingsDataStore.settings.serviceApiUrl,
    }),
  };

  // constructor() {
  //   makeAutoObservable(this, undefined, { autoBind: true });
  // }

  get axiosInstance(): AxiosInstance {
    return this.state.axiosInstance;
  }
}
