import React from 'react';
import ReactDOM from 'react-dom/client';
import { provider } from 'react-ioc';

import './index.css';
import AppModule from './App';
import { ThemeStore, GlobalSettingsStore } from './stores';
import { ThemeProvider } from './components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const BrowserModule = provider(
  ThemeStore,
  GlobalSettingsStore
)(() => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <AppModule />
      </ThemeProvider>
    </QueryClientProvider>
  );
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<BrowserModule />);
