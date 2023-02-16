import { makeAutoObservable } from 'mobx';

export type GlobalSettings = Record<'serviceApiUrl', string | undefined>;

interface GlobalSettingsState {
  settings: GlobalSettings;
}

export class GlobalSettingsStore {
  private state: GlobalSettingsState = {
    settings: {
      serviceApiUrl: '/api',
    },
  };

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get settings(): GlobalSettings {
    return this.state.settings;
  }
}
