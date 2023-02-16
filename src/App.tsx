import React, { FC, Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Routes, Route, useParams } from 'react-router-dom';
import { provider, useInstance } from 'react-ioc';
import { Title1 } from '@fluentui/react-components';
import { ApiServiceStore, FiltersStore } from './stores';

import { useStyles } from './App.styles';
import { Filters } from './components';
import { FiltersService } from './services';

const AppModule = provider(
  ApiServiceStore,
  FiltersService,
  FiltersStore
)(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title1>Dynamic Filters</Title1>
      <div className={classes.filters}>
        <label className={classes.label}>Filters:</label>
        <Filters />
      </div>
    </div>
  );
});

export default AppModule;
