import { OpaqueToken } from '@angular/core';
import { Config } from './config';

export const ConfigToken = new OpaqueToken('CONFIGTOKEN');
export const EnvToken = new OpaqueToken('ENVTOKEN');
export const CustomLoaderToken = new OpaqueToken('CUSTOMLOADERTOKEN');

export abstract class ConfigBase implements Config {

  protected data: Object;

  protected static envs: Array<string> = [];

  protected envExtend: {[key: string]: string} = {};

  constructor(private env?: string, ...args: Array<any>) {
    if (env) {
      ConfigBase.envs.push(env);
    }

    this.data = this.getData.apply(this, args);
    this.validate();
  }

  protected abstract getData(...args: Array<any>): Object;

  validate() {}

  setEnv(env: string): this {
    ConfigBase.envs.push(env);
    this.env = env;
    return this;
  }

  getEnv(): string {
    return this.env;
  }

  setEnvExtends(env: string, envExtend: string): this {
    this.envExtend[env] = envExtend;
    return this;
  }

  getEnvExtends(env: string): string | void {
    return this.envExtend[env] ? this.envExtend[env] : null;
  }

  set(key: string, value: any, env?: boolean | string): this {
    let _env: string = this.env;

    if (env === false) {
      _env = '';
    } else if (typeof env === 'string') {
      // validate extends
      if (env.indexOf(':') !== -1) {
        // validate if value is object
        if (typeof value !== 'object' || value === null) {
          throw new Error('To extends value should be object');
        }
        let envExtend = env.substr(env.indexOf(':') + 1);
        let data = this.get(key, envExtend);
        if (typeof data !== 'object' || data === null) {
          throw new Error(`The env '${envExtend}' should be object`);
        }
      }
      _env = env;
    }

    if (_env) {
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
      return this.getResult(result, env);
    }

    // catch env global
    if (result[this.env] !== undefined) {
      return this.getResult(result, this.env);
    }

    return result;
  }

  protected getResult(result: any, env: string) {

    let envs = []; 
    let keyExtends = [env, ':'].join('');
    let envExtend: string | void;
    
    Object.keys(result).forEach((keyEnv: any) => {
      if (keyEnv.indexOf(keyExtends) === 0) {
        env = keyEnv;
        envExtend = keyEnv.split(':')[1];
      }
    });

    if (!envExtend) {
      envExtend = this.getEnvExtends(env);
    }

    // not extends
    if (!envExtend) {
      return result[env] !== undefined ? result[env] : null;
    }

    let argumentsAssign = [
      {}
    ];
    this.orderEnvExtends(result, envExtend, argumentsAssign);
    argumentsAssign.push(result[env]);

    return Object.assign.apply(null, argumentsAssign);
  }

  protected orderEnvExtends(result: any, envExtend: string, argumentsApply: Array<any>) {
    if (result[envExtend]) {
      argumentsApply.unshift(result[envExtend]);
      return;
    }

    let keyExtend = [envExtend, ':'].join('');
    Object.keys(result).forEach((env: any) => {
      if (env.indexOf(envExtend) === 0) {
        argumentsApply.unshift(result[env]);
        this.orderEnvExtends(result, env.substr(keyExtend.length), argumentsApply);
      }
    });
  }

  getAll(): any {
    return this.data;
  }
}
