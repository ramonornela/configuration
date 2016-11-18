import { NgModule } from '@angular/core';
import { HttpModule, BrowserXhr } from '@angular/http';
import { Config } from './config';
import { ConfigToken, EnvToken } from './config-base';
import { loaderFactory } from './factory';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    {provide: Config, useFactory: loaderFactory, deps: [ConfigToken, BrowserXhr, EnvToken]}
  ]
})
export class ConfigModule {
}
