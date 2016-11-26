
import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';

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

export var XHRProxy = function() {
  this.uri = null;
}

XHRProxy.prototype.responseType = null;

XHRProxy.prototype.open = function(method, uri, sync) {
  this.file = uri;
}

XHRProxy.prototype.addEventListener = function(event, callback) {}

XHRProxy.prototype.send = function(data) {}
