import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { ConfigBase } from '../config-base';

@Injectable()
export class Json extends ConfigBase {

  constructor(file: string, xhr: BrowserXhr, env?: string) {
    super(null, env);
    this.setData(this.load(file, xhr));
  }

  load(file: string, xhr: BrowserXhr): any {
    let data: any;
    let _xhr = xhr.build();

    _xhr.open('GET', file, false);
    _xhr.reponseType = 'json';
    _xhr.addEventListener('load', () => {
      try {
        data = JSON.parse(_xhr.responseText);
      } catch (err) {
        throw 'Sintaxe erro no arquivo' + file + ' error: ' + err.message;
      }
    });

    _xhr.addEventListener('error', () => {
      throw 'Arquivo de configuração inexistente ' + file;
    });

    _xhr.send();

    return data;
  }
}
