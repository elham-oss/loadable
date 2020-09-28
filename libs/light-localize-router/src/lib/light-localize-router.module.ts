import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ParserConfig } from './contracts/parser-config.contract';
import { getAppInitializer } from './utilities/app-initializer-generator.utility';
import { ParserInitializer } from './parser.initializer';
import { AbstractParser } from './parser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ]
})
export class LightLocalizeRouterModule {
  static forRoot(config: ParserConfig): ModuleWithProviders<LightLocalizeRouterModule> {
    return {
      ngModule: LightLocalizeRouterModule,
      providers: [
        config.parser,
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: getAppInitializer,
          deps: [ParserInitializer, AbstractParser]
        },
      ]
    };
  }
}
