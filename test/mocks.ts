
import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class MockBrowserXhr extends BrowserXhr {
  constructor() {
  	super();
  }

  build(): any {}
}
