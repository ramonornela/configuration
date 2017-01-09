import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { ConfigBase } from '../config-base';

@Injectable()
export class JsonData extends ConfigBase {

  constructor(file: string, xhr: BrowserXhr, env?: string) {
    super(env, file, xhr);
  }

  protected getData(file: string, xhr: BrowserXhr): Object {
    let data = this.load(file, xhr);

    if (Array.isArray(data)) {
      throw new Error(`Data type 'array' to config invalid`);
    }

    if (Object.keys(data).length === 0) {
      throw new Error('Config is required');
    }

    return data;
  }

  protected load(file: string, xhr: BrowserXhr): Object {
    let data: any;
    let _xhr = xhr.build();

    _xhr.open('GET', file, false);
    _xhr.reponseType = 'json';
    _xhr.addEventListener('load', () => {
      try {
        data = JSON.parse(_xhr.responseText);
      } catch (err) {
        throw new Error(`Syntax error '${file}' error: ${err.message}`);
      }
    });

    _xhr.addEventListener('error', () => {
      throw new Error(`Problem to access '${file}'`);
    });

    _xhr.send();

    return data;
  }
}
