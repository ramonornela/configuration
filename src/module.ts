import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserXhr, HttpModule } from '@angular/http';
import { Config, ConfigToken, CustomLoaderToken, EnvToken, loaderFactory } from './providers';

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
