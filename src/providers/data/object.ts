import { Injectable } from '@angular/core';
import { ConfigBase } from '../config-base';

@Injectable()
export class ObjectData extends ConfigBase {

  constructor(data: Object, env?: string) {
    super(env, data);
  }

  protected getData(data: Object): Object {

    if (data === null || Array.isArray(data)) {
      throw new Error('Data type config invalid');
    }

    if (Object.keys(data).length === 0) {
      throw new Error('Config is required');
    }

    return data;
  }
}
