import { Injectable, OpaqueToken } from '@angular/core';
import { Config } from './config';

export const ConfigToken = new OpaqueToken('CONFIGTOKEN');
export const EnvToken = new OpaqueToken('ENVTOKEN');

@Injectable()
export class ConfigBase implements Config {

  protected data: any;

  constructor(data: any, private env?: string) {
    if (data) {
      this.setData(data);
    }
  }

  setData(data: any): this {
    this.data = data;
    return this;
  }

  setEnv(env: string): this {
    this.env = env;
    return this;
  }

  getEnv(): string {
    return this.env;
  }

  set(key: string, value: any, env?: boolean | string): this {
    let _env: string = this.env;

    if (env === false) {
      _env = '';
    } else if (typeof env === 'string') {
      _env = env;
    }

    if (_env) {
      this.data[key] = this.data[key] || {};
      this.data[key][_env] = value;
      return this;
    }

    this.data[key] = value;
    return this;
  }

  get(key: string, env?: boolean | string): any {
    let result: any = typeof this.data[key] !== undefined ? this.data[key] : null;
    let _env: string = this.env;

    if (env === false) {
      _env = '';
    } else if (typeof env === 'string') {
      _env = env;
    }

    if (_env && result[_env] !== undefined) {
      return result[_env];
    }

    return result;
  }

  getAll(): any {
    return this.data;
  }
}
