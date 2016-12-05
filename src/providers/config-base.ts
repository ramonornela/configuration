import { OpaqueToken } from '@angular/core';
import { Config } from './config';

export const ConfigToken = new OpaqueToken('CONFIGTOKEN');
export const EnvToken = new OpaqueToken('ENVTOKEN');
export const CustomLoaderToken = new OpaqueToken('CUSTOMLOADERTOKEN');

export abstract class ConfigBase implements Config {

  protected data: Object;

  protected static envs: Array<string> = [];

  protected envsExtend: {[key: string]: string} = {};

  protected keysEnvExtend: {[key: string]: {[key: string]: string}} = {};

  constructor(private env?: string, ...args: Array<any>) {
    if (env) {
      ConfigBase.envs.push(env);
    }

    this.data = this.getData.apply(this, args);
    this.extractExtends();
  }

  protected abstract getData(...args: Array<any>): Object;

  extractExtends() {
    for (let key in this.data) {
      for (let env in this.data[key]) {
        if (env.indexOf(':') !== -1) {
          this.checkExtends(env, key, this.data[key]);
        }
      }
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

  setEnvExtend(env: string, envExtend: string): this {
    this.envsExtend[env] = envExtend;
    return this;
  }

  getEnvExtend(env: string): string | void {
    return this.envsExtend[env] ? this.envsExtend[env] : null;
  }

  setKeyEnvExtend(key: string, env: string, envExtend: string): this {
    this.keysEnvExtend[key] = this.keysEnvExtend[key] || {};
    this.keysEnvExtend[key][env] = envExtend;

    return this;
  }

  getKeyEnvExtend(key: string, env: string): string | void {
    if (this.keysEnvExtend[key] === undefined) {
      return null;
    }

    if (this.keysEnvExtend[key][env] === undefined) {
      return null;
    }

    return this.keysEnvExtend[key][env];
  }

  set(key: string, value: any, env?: boolean | string): this {
    let _env: string = this.env;

    if (env === false) {
      _env = '';
    } else if (typeof env === 'string') {
      // validate extends prod:dev
      _env = env;
      if (env.indexOf(':') !== -1) {
        this.checkExtends(env, key, value);
      }
    }

    if (_env) {
      this.validateDataAlreadyAssign(key);
      this.data[key] = this.data[key] || {};
      this.data[key][_env] = value;
      ConfigBase.envs.push(_env);
      return this;
    }

    this.data[key] = value;
    return this;
  }

  protected validateDataAlreadyAssign(key: string) {
    // validate values already assign
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
  }

  protected checkExtends(env: string, key: string, value: any) {
    // validate if value is object
    if (typeof value !== 'object' || value === null) {
      throw new Error('To extends value should be object');
    }
    let envExtend = env.substr(env.indexOf(':') + 1);
    let data = this.data[key][envExtend];
    if (typeof data !== 'object' || data === null) {
      throw new Error(`The env '${envExtend}' should be object`);
    }
    env = env.substr(0, env.indexOf(':'));

    // assign key extends ex my-key extends dev:dev1
    this.setKeyEnvExtend(key, env, envExtend);
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
      return this.getResult(result, key, env);
    }

    // catch env global
    if (result[this.env] !== undefined) {
      return this.getResult(result, key, this.env);
    }

    return result;
  }

  protected getResult(result: any, key: string, env: string) {

    let envExtend = this.getKeyEnvExtend(key, env);

    if (!envExtend) {
      envExtend = this.getEnvExtend(env);
    }

    // not extends
    if (!envExtend) {
      return result[env] !== undefined ? result[env] : null;
    }

    let lastResult = result[env];
    if (!lastResult) {
      lastResult = result[[ env, ':', envExtend ].join('')];
    }

    let argumentsAssign = [
      {}
    ];

    this.orderEnvExtends(result, key, envExtend, argumentsAssign);
    argumentsAssign.push(lastResult);

    return Object.assign.apply(null, argumentsAssign);
  }

  protected orderEnvExtends(result: any, key: string, env: string, argumentsApply: Array<any>) {
    if (result[env]) {
      argumentsApply.unshift(result[env]);
      return;
    }

    let envExtend = this.getKeyEnvExtend(key, env);

    if (!envExtend) {
      envExtend = this.getEnvExtend(env);
    }

    if (envExtend) {
      let envConcat = [ env, ':', envExtend ].join('');
      argumentsApply.unshift(result[envConcat]);
      this.orderEnvExtends(result, key, envExtend, argumentsApply);
    }
  }

  getAll(): any {
    return this.data;
  }
}
