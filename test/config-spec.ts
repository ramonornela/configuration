import 'zone.js';
import 'reflect-metadata';
import 'zone.js/dist/proxy';
import 'zone.js/dist//sync-test';
import 'zone.js/dist/jasmine-patch';
import { TestBed, inject } from '@angular/core/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ConfigurationModule, Config, ConfigToken, EnvToken, CustomLoaderToken } from '../src';
import { customLoader } from './mocks';

function configModule(data?: Object, loader?: Function) {
  data = data || {
    'my-config': 'value',
    'my-config-env': {
      'dev': 'Config Dev'
    },
    'my-config-initialize-scalar': 'valueInit',
    'my-config-initialize-object': {
      'value': 'one'
     }
  };

  TestBed.configureTestingModule({
    providers: [
      { provide: ConfigToken, useValue: data },
      { provide: CustomLoaderToken, useValue: loader },
      { provide: EnvToken, useValue: 'dev' }
    ]
  });
}
describe('Module Config', () => {
  beforeAll(() => {
    TestBed.initTestEnvironment(
      ConfigurationModule,
      platformBrowserDynamicTesting()
    );
  });

  afterAll(() => {
    TestBed.resetTestEnvironment();
  });

  beforeEach(() => {
    configModule();
  });

  it('Env', inject([Config], (config: any) => {
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
    expect(config.get('my-config-invalid')).toBeNull();
  }));

  it('Get config env', inject([Config], (config: Config) => {
    expect(config.get('my-config-env')).toBe('Config Dev');
    config.set('my-config-env', 'Config Prod', 'prod');
    expect(config.get('my-config-env')).toBe('Config Dev');
    expect(config.get('my-config-env', 'prod')).toBe('Config Prod');
  }));

  it('Get config env invalid', inject([Config], (config: Config) => {
    expect(config.get('my-config-env', 'prod')).toBeNull();
  }));

  it('Fluent interface', inject([Config], (config: Config) => {
    config.setEnv('dev').set('config-fluent', 'Config');
  }));

  it('Set env env', inject([Config], (config: Config) => {
    config.set('my-config-setenv', 'valueDev');
    config.set('my-config-setenv', 'valueProd', 'prod');
    expect(config.get('my-config-setenv')).toBe('valueDev');
    expect(config.get('my-config-setenv', 'dev')).toBe('valueDev');
    expect(config.get('my-config-setenv', 'prod')).toBe('valueProd');
  }));

  it('Set env param initialize', inject([Config], (config: Config) => {
     expect(() => config.set('my-config-initialize-scalar', 'valueProd', 'prod'))
        .toThrow(new Error('Not allow assign to value initialized how scalar'));

      expect(() => config.set('my-config-initialize-object', 'valueProd', 'prod'))
        .toThrow(new Error('Not allow assign to value initialized how object'))
  }));

  describe('Custom loader', () => {

    beforeEach(() => {
      configModule('test.yml', customLoader);
    });

    it('custom loader', inject([Config], (config: any) => {
      expect(config.file).toBe('test.yml');
    }));

  });
});
