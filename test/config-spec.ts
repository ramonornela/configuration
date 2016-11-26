import 'zone.js';
import 'zone.js/dist/proxy';
import 'zone.js/dist//sync-test';
import 'zone.js/dist/jasmine-patch';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ConfigModule } from '../src';

describe('factories json', () => { 
  beforeEach(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });

  afterEach(() => {
    TestBed.resetTestEnvironment();
  });

  it('foo', () => {

  });
});
