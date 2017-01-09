import { BrowserXhr } from '@angular/http';
import { JsonData } from './data/json';
import { ObjectData } from './data/object';

export function dataFactory(config: Object, env?: string): Object {
  return new ObjectData(config, env);
}

export function jsonFactory(config: string, xhr: BrowserXhr, env?: string): JsonData {
  return new JsonData(config, xhr, env);
}

export function loaderFactory(config: any, xhr?: BrowserXhr, env?: string, customLoader?: Function) {

  switch (true) {
    case typeof config === 'object':
      return dataFactory(config, env);
    case typeof config === 'string' && (config.indexOf('.json') !== -1 || config.indexOf('http') !== -1):
      return jsonFactory(config, xhr, env);
    case typeof customLoader === 'function':
      return customLoader.apply(null, [config, env]);
    default:
      throw new Error('Invalid configuration');
  }
}
