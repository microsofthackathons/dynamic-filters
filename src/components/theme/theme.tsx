import React, { FC, ReactNode } from 'react';
import { FluentProvider, teamsDarkTheme, teamsLightTheme } from '@fluentui/react-components';
import { observer } from 'mobx-react-lite';
import { useInstance } from 'react-ioc';
import { ThemeStore } from '../../stores/theme.store';

export const ThemeProvider: FC<{ children?: ReactNode }> = observer(props => {
  const themeStore = useInstance(ThemeStore);
  return (
    <FluentProvider theme={themeStore.theme === 'dark' ? teamsDarkTheme : teamsLightTheme}>
      {props.children}
    </FluentProvider>
  );
});
