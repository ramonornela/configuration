import { Injectable } from '@angular/core';
import { ConfigBase } from '../config-base';

@Injectable()
export class ObjectData extends ConfigBase {

  constructor(data: Object, env?: string) {
    super(env);
    if (data === null) {
      throw new Error(`Data is required`);
    }

    if (Object.keys(data).length === 0) {
      throw new Error(`Data is required`);
    }

    this.data = data;
  }
}
