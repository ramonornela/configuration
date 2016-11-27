# ConfigurationModule

This allow define configuration in the app with object, file json (local or external) or custom strategy (ex: yaml)

## Using  in an Ionic 2 app

```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// import ConfigurationModule
import { ConfigToken, ConfigurationModule, EnvToken } from '@ramonornela/configuration';

export const APP_CONFIG = {
  'my-config': 'My Config',
  'my-config-env': {
    'dev': 'Config Dev',
    'prod': 'Config Dev'
  }
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ConfigurationModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    { provide: EnvToken, useValue: 'dev' },
    { provide: ConfigToken, useValue: APP_CONFIG }
  ]
})
export class AppModule {}
```

Contributing

See [CONTRIBUTING.md](https://github.com/ramonornela/configuration/blob/master/.github/CONTRIBUTING.md)
