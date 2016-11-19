import { NgModule } from '@angular/core';
import { HttpModule, BrowserXhr } from '@angular/http';
import { Config, loaderFactory, ConfigToken, EnvToken } from './providers';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    {provide: Config, useFactory: loaderFactory, deps: [ConfigToken, BrowserXhr, EnvToken]}
  ]
})
export class ConfigModule {
}
