import { BrowserXhr } from '@angular/http';
import { ConfigBase } from './config-base';
import { Json } from './loader/json';

export function dataFactory(config: Object): ConfigBase {
  return new ConfigBase(config);
}

export function jsonFactory(config: string, xhr: BrowserXhr): Json {
  return new Json(config, xhr);
}

export function loaderFactory(config: any, xhr: BrowserXhr) {

  switch (true) {
    case typeof config === 'object':
      return dataFactory(config);
    case typeof config === 'string':
      return jsonFactory(config, xhr);
    default:
      throw 'Configuração invâlida';
  }
}
