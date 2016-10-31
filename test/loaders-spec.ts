import { MockBrowserXhr } from './mocks';
import { loaderFactory } from '../src';

describe('loaders', () => {
  describe('factories tests', () => {
    it('invalid type string', () => {
      expect(() => loaderFactory('{}', new MockBrowserXhr()))
        .toThrow(new Error('Invalid configuration'));
    });

    it('invalid type null', () => {
      expect(() => loaderFactory(null))
        .toThrow(new Error('Invalid configuration'));
    });
  });
});
