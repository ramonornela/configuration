import { Injectable, OpaqueToken } from '@angular/core';

export const ConfigToken = new OpaqueToken('CONFIG');

@Injectable()
export abstract class Config {
  abstract set(key: string, value: any): this;
  abstract get(key: string): any;
  abstract getAll(): any;
}
