import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule, BrowserXhr } from '@angular/http';
import { Config, loaderFactory, ConfigToken, EnvToken, CustomLoaderToken } from './providers';

@NgModule({
  imports: [ HttpModule ]
})
export class ConfigurationModule {
  static initialize(configs: any, env?: string, customLoader?: Function): ModuleWithProviders {
    return {
      ngModule: ConfigurationModule,
      providers: [
        { provide: ConfigToken, useValue: configs },
        { provide: EnvToken, useValue: env },
        { provide: CustomLoaderToken, useValue: customLoader },
        { provide: Config, useFactory: loaderFactory, deps: [ ConfigToken, BrowserXhr, EnvToken, CustomLoaderToken ] }
      ]
    };
  }
}
