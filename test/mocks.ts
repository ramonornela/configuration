
import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { ConfigBase } from '../src';

@Injectable()
export class MockBrowserXhr extends BrowserXhr {

  xhr: any;

  constructor() {
  	super();
  }

  build(): any {
    this.xhr = new XHRProxy();
    return this.xhr;
  }
}

class XHRProxy {

  responseType: any;

  open(method, uri, sync) {}

  addEventListener(event, callback) {}

  send(data) {}
}

export function customLoader(config: any, env: string) {
  return new MyCustomLoader(config, env);
}

export class MyCustomLoader extends ConfigBase {
  constructor(public file, env: string) {
    super(env);
  }

  protected getData(): Object {
    return {};
  }
}
