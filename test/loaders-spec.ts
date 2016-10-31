import { MockBrowserXhr } from './mocks';
import { loaderFactory } from '../src';

describe('loaders', () => {
  describe('test factories', () => {
    let factoryJson = loaderFactory('{}', new MockBrowserXhr());
    console.log(factoryJson);
  });
 });
