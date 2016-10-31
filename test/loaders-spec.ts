import { MockBrowserXhr } from './mocks';
import { loaderFactory } from '../src';

describe('loaders', () => {
  describe('factories tests', () => {
    it('invalid type string', () => {
      expect(() => loaderFactory('{}', new MockBrowserXhr()))
        .toThrow('Invalid configuration');
    });

    it('invalid type null', () => {
      expect(() => loaderFactory(null))
        .toThrow('Invalid configuration');
    });
  });
});
