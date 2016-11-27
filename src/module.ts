import { NgModule } from '@angular/core';
import { HttpModule, BrowserXhr } from '@angular/http';
import { Config, loaderFactory, ConfigToken, EnvToken, CustomLoaderToken } from './providers';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    {provide: CustomLoaderToken, useValue: null},
    {provide: Config, useFactory: loaderFactory, deps: [ConfigToken, BrowserXhr, EnvToken, CustomLoaderToken]}
  ]
})
export class ConfigurationModule {
}
