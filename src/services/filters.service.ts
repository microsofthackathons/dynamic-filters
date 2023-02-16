import { Zodios, makeApi, ZodiosInstance } from '@zodios/core';
import { pluginFetch } from '@zodios/plugins';
import { ZodiosHooks, ZodiosHooksInstance } from '@zodios/react';
import { inject } from 'react-ioc';
import { ApiServiceStore } from '../stores';
import { z } from 'zod';

export const NamedObject = z.object({
  name: z.string(),
  displayName: z.string(),
  description: z.string().nullish(),
});

const FilterItem = z.object({
  value: z.string(),
  text: z.string(),
  selected: z.boolean().default(false),
});

const Filter = NamedObject.extend({
  options: z.array(FilterItem).nonempty().nullable(),
  service: z.string().nullable(),
  dependencies: z.array(z.string()).nonempty().nullable(),
  multiSelect: z.boolean().default(false),
}).refine(data => {
  if (data.service && data.options) {
    throw new Error('Filter cannot have both options and service');
  }

  if (!data.service && !data.options) {
    throw new Error('Filter must have either options or service');
  }

  if (data.dependencies && !data.service) {
    throw new Error('Filter dependencies can only be defined if service is defined');
  }

  if (data.dependencies && data.options) {
    throw new Error('Filter cannot have both options and dependencies');
  }

  return true;
});

const FilterParam = z.object({
  name: z.string(),
  value: z.array(z.string()),
});

const endpoints = makeApi([
  {
    method: 'get',
    path: '/filters',
    alias: 'getFilters',
    response: z.array(Filter),
  },
  {
    method: 'post',
    path: '/filters/:name',
    alias: 'getFilter',
    parameters: [
      {
        name: 'params',
        type: 'Body',
        schema: z.array(FilterParam).nonempty(),
      },
    ],
    response: z.array(FilterItem),
  },
]);

export type Filter = z.infer<typeof Filter> & { [key: string]: any };
export type FilterItem = z.infer<typeof FilterItem> & { [key: string]: any };
export type FilterParam = z.infer<typeof FilterParam> & { [key: string]: any };

export class FiltersService {
  private _apiServiceDataStore = inject(this, ApiServiceStore);
  private _apiClient: ZodiosInstance<typeof endpoints>;
  private _apiHook: ZodiosHooksInstance<typeof endpoints>;

  constructor(prefix = 'Filters') {
    this._apiClient = new Zodios(endpoints, { axiosInstance: this._apiServiceDataStore.axiosInstance });
    this._apiClient.use(pluginFetch({ keepalive: true }));

    this._apiHook = new ZodiosHooks(prefix, this.apiClient);
  }

  get apiClient() {
    return this._apiClient;
  }

  get apiHook() {
    return this._apiHook;
  }
}
