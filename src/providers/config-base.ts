import { OpaqueToken } from '@angular/core';
import { Config } from './config';

export const ConfigToken = new OpaqueToken('CONFIGTOKEN');
export const EnvToken = new OpaqueToken('ENVTOKEN');
export const CustomLoaderToken = new OpaqueToken('CUSTOMLOADERTOKEN');

export abstract class ConfigBase implements Config {

  protected data: Object;

  protected static envs: Array<string> = [];

  constructor(private env?: string) {
    if (env) {
      ConfigBase.envs.push(env);
    }
  }

  setEnv(env: string): this {
    ConfigBase.envs.push(env);
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
      if (typeof this.data[key] !== 'object') {
        if (this.data[key] !== undefined) {
          throw new Error('Not allow assign to value initialized how scalar');
        }
      } else if (this.data[key] !== null) {
        let envs = ConfigBase.envs.filter((value, index, array) => array.indexOf(value) === index);
        let isThrow = true;
        for (let i = 0, length = envs.length; i < length; i++) {
          if (envs[i] in this.data[key]) {
            isThrow = false;
          }
        }
        if (isThrow) {
          throw new Error('Not allow assign to value initialized how object');
        }
      }

      this.data[key] = this.data[key] || {};
      this.data[key][_env] = value;
      ConfigBase.envs.push(_env);
      return this;
    }

    this.data[key] = value;
    return this;
  }

  get(key: string, env?: boolean | string): any {
    let result: any = this.data[key] !== undefined ? this.data[key] : null;

    if (result === null) {
      return null;
    }

    // less env
    if (env === false) {
      return result;
    }

    // env assign in arg
    if (typeof env === 'string') {
      return result[env] !== undefined ? result[env] : null;
    }

    // catch env global
    if (result[this.env] !== undefined) {
      return result[this.env];
    }

    return result;
  }

  getAll(): any {
    return this.data;
  }
}
