import { Dropdown, Option } from '@fluentui/react-components';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useInstance } from 'react-ioc';
import { FiltersStore } from '../../stores';
import { useStyles } from './filters.styles';

const FiltersBase = () => {
  const classes = useStyles();
  const store = useInstance(FiltersStore);
  const { filtersMetadata, filters } = store;

  return (
    <div className={classes.root}>
      {filtersMetadata.map(filterMetadata => {
        const { name: filterName, displayName, multiSelect } = filterMetadata;
        const { selectedOptions, value: options, text: defaultText } = filters[filterName];

        return (
          <div className={classes.filterContainer} key={filterName}>
            <label id={filterName} className={classes.filterLabel}>
              {displayName}
            </label>
            <Dropdown
              aria-labelledby={filterName}
              placeholder={`Select a ${displayName}`}
              defaultSelectedOptions={selectedOptions}
              defaultValue={defaultText}
              multiselect={multiSelect}
              disabled={options.length === 0}
              onOptionSelect={(_, data) => store.setSelectedOptions(filterName, data.selectedOptions)}
            >
              {options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.text}
                </Option>
              ))}
            </Dropdown>
          </div>
        );
      })}
    </div>
  );
};

export const Filters = observer(FiltersBase);
