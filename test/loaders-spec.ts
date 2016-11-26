import 'jasmine';
import { MockBrowserXhr } from './mocks';
import { loaderFactory, JsonData, ObjectData } from '../src';

describe('loaders', () => {
  describe('factories type invalids', () => {

    it('invalid type string', () => {
      expect(() => loaderFactory('{}', new MockBrowserXhr()))
        .toThrow(new Error('Invalid configuration'));
    });

    it('invalid type null', () => {
      expect(() => loaderFactory(null))
        .toThrow(new Error('Data type config invalid'));
    });

    it('invalid type number', () => {
      expect(() => loaderFactory(1))
        .toThrow(new Error('Invalid configuration'));
    });

    it('invalid type array', () => {
      expect(() => loaderFactory([]))
        .toThrow(new Error('Data type config invalid'));
    });

    it('object empty', () => {
      expect(() => loaderFactory({}))
        .toThrow(new Error('Config is required'));
    });
  });

  describe('factory object', () => {
    it('test object', () => {
      var jsonLoader = loaderFactory({'key': 'value' });
      expect(jsonLoader instanceof ObjectData).toBeTruthy();
    });
  });
});
