import { BrowserXhr } from '@angular/http';
import { ConfigBase } from './config-base';
import { Json } from './loader/json';

export function dataFactory(config: Object, env?: string): ConfigBase {
  return new ConfigBase(config, env);
}

export function jsonFactory(config: string, xhr: BrowserXhr, env?: string): Json {
  return new Json(config, xhr, env);
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
