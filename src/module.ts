import { NgModule } from '@angular/core';
import { HttpModule, BrowserXhr } from '@angular/http';
import { Config, ConfigToken } from './config';
import { loaderFactory } from './factory';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    {provide: Config, useFactory: loaderFactory, deps: [ConfigToken, BrowserXhr]}
  ]
})
export class ConfigModule {
}
