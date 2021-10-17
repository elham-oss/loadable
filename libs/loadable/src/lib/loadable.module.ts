import { NgModule, Inject, Optional } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule } from '@angular/common';
import { provideRoutes, Route } from '@angular/router';

import { LoadableComponent } from './loadable.component';
import { LOADABLE_CONFIG, LoadableService, LOADABLE_ROOT_OPTIONS } from './loadable.service';
import { ILoadableConfig, ModuleConfig, ILoadableRootConfig } from './loadable.config';

@NgModule({
  declarations: [LoadableComponent],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  exports: [LoadableComponent]
})
export class LoadableModule {
  static forRoot(config: ILoadableRootConfig = {}): ModuleWithProviders  {
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
        { provide: LOADABLE_CONFIG, useValue: config.moduleConfigs, multi: true },
        { provide: LOADABLE_ROOT_OPTIONS, useValue: config.rootOptions || {} },
        provideRoutes(config.moduleConfigs as Route[]),
      ]
    };
  }

  static forFeature(config: ILoadableConfig = {}): ModuleWithProviders {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
      ngModule: LoadableModule,
      providers: [
        { provide: LOADABLE_CONFIG, useValue: {}, multi: true, deps: [LoadableService] },
        { provide: LOADABLE_CONFIG, useValue: config.moduleConfigs, multi: true },
        provideRoutes(config.moduleConfigs as Route[]),
      ]
    };
  }

  constructor(
    ls: LoadableService,
    @Optional() @Inject(LOADABLE_CONFIG) configs: ModuleConfig[][] = [],
  ) {
    if (!configs) {
      return;
    }

    ls.addConfig(configs[configs.length - 1]);
  }
}
