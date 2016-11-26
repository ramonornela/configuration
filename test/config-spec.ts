import 'zone.js';
import 'reflect-metadata';
import 'zone.js/dist/proxy';
import 'zone.js/dist//sync-test';
import 'zone.js/dist/jasmine-patch';
import { TestBed, inject } from '@angular/core/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ConfigModule, Config, ConfigToken, EnvToken } from '../src';

TestBed.initTestEnvironment(
  ConfigModule,
  platformBrowserDynamicTesting()
);

describe('Module Config', () => {
  beforeEach(() => {
    let data = {
      'my-config': 'value'
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigToken, useValue: data },
        { provide: EnvToken, useValue: 'dev' }
      ]
    });
  });

  it('Env', inject([Config], (config: Config) => {
    expect(config.getEnv()).toEqual('dev');
    config.setEnv('prod');
    expect(config.getEnv()).toEqual('prod');
  }));

  it('Get config', inject([Config], (config: Config) => {
    expect(config.get('my-config')).toEqual('value');
    config.set('my-other-config', 'value-config');
    expect(config.get('my-other-config')).toEqual('value-config');
  }));

  it('Get invalid config', inject([Config], (config: Config) => {
    expect(config.get('my-config-invalid')).toEqual(null);
  }));
});
