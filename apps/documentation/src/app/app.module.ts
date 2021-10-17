import { BrowserModule } from '@angular/platform-browser';
import { Injectable, Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { Location } from '@angular/common';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AbstractParser, HttpLoader, LightLocalizeRouterModule } from '@elham-oss/light-localize-router';
import { LoadableModule, matcher } from '@elham-oss/loadable';

@Injectable({ providedIn: 'root' })
export class HttpClientTrans extends HttpClient {
  constructor(handler: HttpBackend) {
    super(handler);
  }
}

export function HttpLoaderFactory(http: HttpClientTrans) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '-lang.json');
}

@NgModule({
  declarations: [AppComponent, FirstPageComponent, SecondPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoadableModule.forRoot({
      moduleConfigs: [
        {
          name: 'loadable-a',
          loadChildren: () => import('./loadable-a/loadable-a.module').then(mod => mod.LoadableAModule),
          matcher
        },
        {
          name: 'loadable-b',
          loadChildren: () => import('./loadable-b/loadable-b.module').then(mod => mod.LoadableBModule),
          matcher
        }
      ]
    }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'first-page', pathMatch: 'full' },
      { path: 'first-page', component: FirstPageComponent },
      { path: 'second-page', component: SecondPageComponent }
    ], { relativeLinkResolution: 'legacy' }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClientTrans]
      }
    }),
    LightLocalizeRouterModule.forRoot({
      parser: {
        provide: AbstractParser,
        useFactory: (translate, location, injector, platformId, http) => {
          return new HttpLoader(translate, location, http, injector, platformId);
        },
        deps: [TranslateService, Location, Injector, PLATFORM_ID, HttpClient]
      }
    }),
    LoadableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
