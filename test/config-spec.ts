import 'zone.js';
import 'reflect-metadata';
import 'zone.js/dist/proxy';
import 'zone.js/dist//sync-test';
import 'zone.js/dist/jasmine-patch';
import { TestBed, inject } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
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
     },
     'my-config-extends': {
       'dev': {
         'name': 'John',
         'age': 20
       },
       'staging:dev': {
         'name': 'George'
       },
       'prod:staging': {
         'age': 30,
       }
     }
  };

  TestBed.configureTestingModule({
    imports: [ ConfigurationModule.initialize(data, 'dev', loader) ]
  });
}

describe('Module Config', () => {
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
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

  it('Set env', inject([Config], (config: Config) => {
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

  describe('Extends env', () => {
    it('invalid value', inject([Config], (config: Config) => {
      expect(() => config.set('my-config-extends-dev2', 'Name', 'dev2:dev'))
        .toThrow(new Error('To extends value should be object'));

      expect(() => config.set('my-config-extends-dev3', { name: 'Name'}, 'dev3:dev'))
        .toThrow(new Error(`The env 'dev' should be object`));
    }));

    it('set config', inject([Config], (config: Config) => {
      config.set('my-config-dev1', {name: 'George'}, 'dev1');
      config.set('my-config-dev1', {name: 'John', age: 40}, 'dev2:dev1');

      let configDev1 = config.get('my-config-dev1', 'dev2');
      expect(configDev1.name).toEqual('John');
      expect(configDev1.age).toEqual(40);
    }));

    it('get set env', inject([Config], (config: Config) => {
      let configExtendStaging = config.get('my-config-extends', 'staging');
      expect(configExtendStaging.name).toEqual('George');
      expect(configExtendStaging.age).toEqual(20);

      let configExtendProd = config.get('my-config-extends', 'prod');
      expect(configExtendStaging.name).toEqual('George');
      expect(configExtendStaging.age).toEqual(30);
    }));

    describe('Env extends global', () => {

      beforeEach(() => {
        configModule();
      });

      it('all prod extend dev', inject([Config], (config: any) => {
        config.setEnvExtend('prod2', 'dev')
              .set('my-config-extends', {name: 'Ramon'}, 'prod2');

        let configExtendData = config.get('my-config-extends', 'prod2');
        expect(configExtendData.name).toEqual('Ramon');
        expect(configExtendData.age).toEqual(20);
      }));
    });

  });

  describe('Custom loader', () => {

    beforeEach(() => {
      configModule('test.yml', customLoader);
    });

    it('custom loader', inject([Config], (config: any) => {
      expect(config.file).toBe('test.yml');
    }));

  });
});
