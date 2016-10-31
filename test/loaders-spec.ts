import { MockBrowserXhr } from './mocks';
import { loaderFactory } from '@ramonornela/configuration';

describe('loaders', () => {
  describe('test factories', () => {
    let factoryJson = loaderFactory('{}', new MockBrowserXhr());
    console.log(factoryJson);
  });
 });
