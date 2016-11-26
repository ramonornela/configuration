import { BrowserXhr } from '@angular/http';
import { ObjectData } from './data/object';
import { JsonData } from './data/json';

export function dataFactory(config: Object, env?: string): Object {
  return new ObjectData(config, env);
}

export function jsonFactory(config: string, xhr: BrowserXhr, env?: string): JsonData {
  return new JsonData(config, xhr, env);
}

export function loaderFactory(config: any, xhr?: BrowserXhr, env?: string) {

  switch (true) {
    case typeof config === 'object' && (config !== null && !Array.isArray(config)):
      return dataFactory(config, env);
    case typeof config === 'string' && (config.indexOf('.json') !== -1 || config.indexOf('http') !== -1):
      return jsonFactory(config, xhr, env);
    default:
      throw new Error('Invalid configuration');
  }
}
