import { MockBrowserXhr } from './mocks';
import { loaderFactory, Json } from '../src';

describe('loaders', () => {
  describe('factories type invalids', () => {
    it('invalid type string', () => {
      expect(() => loaderFactory('{}', new MockBrowserXhr()))
        .toThrow(new Error('Invalid configuration'));
    });

    it('invalid type null', () => {
      expect(() => loaderFactory(null))
        .toThrow(new Error('Invalid configuration'));
    });
  });

  describe('factories json', () => {
    it('test file external http', () => {
      var jsonLoader = loaderFactory('http://example.com/data', new MockBrowserXhr());
      expect(jsonLoader instanceof Json).toBeTruthy();
    });

    it('test file local', () => {
      var jsonLoader = loaderFactory('assets/data.json', new MockBrowserXhr());
      expect(jsonLoader instanceof Json).toBeTruthy();
    });
  });
});
