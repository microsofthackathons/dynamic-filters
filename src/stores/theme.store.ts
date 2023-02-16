import { makeAutoObservable } from 'mobx';
// import { makePersistable, stopPersisting } from 'mobx-persist-store';

export class ThemeStore {
  private state: State = {
    theme: 'dark',
  };

  constructor() {
    makeAutoObservable(this);
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => this.setTheme(e.matches ? 'dark' : 'light'));
    // makePersistable(this.state, {
    //   name: 'ThemeDataStore',
    //   properties: ['theme'],
    //   storage: window.localStorage,
    // });
  }

  get theme() {
    return this.state.theme;
  }

  setTheme(value: ThemeValue) {
    this.state.theme = value;
  }

  toggle() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  dispose() {
    // stopPersisting(this.state);
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
  }
}

type ThemeValue = 'dark' | 'light';

interface State {
  theme: ThemeValue;
}
