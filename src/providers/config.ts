import { Injectable } from '@angular/core';

@Injectable()
export abstract class Config {
  abstract setEnv(env: string): this;
  abstract setEnvExtend(env: string, envExtend: string): this;
  abstract getEnvExtend(env: string): string | void;
  abstract setKeyEnvExtend(key: string, env: string, envExtend: string): this;
  abstract getKeyEnvExtend(key: string, env: string): string | void;
  abstract getEnv(): string;
  abstract set(key: string, value: any, env?: boolean | string): this;
  abstract get(key: string,  env?: boolean | string): any;
  abstract getAll(): any;
}
