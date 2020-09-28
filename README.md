# Light Localize Router for ngx-translate
> An implementation of routes localization for Angular without rewriting the router configuration.
>
This project was generated using [Nx](https://nx.dev).

🔎 **Created By [Nrwl/Nx](https://nx.dev/) inspired by [angular-l10n](https://github.com/robisim74/angular-l10n/) & [Greentube/localize-router](https://github.com/Greentube/localize-router) & [gilsdav/ngx-translate-router](https://github.com/gilsdav/ngx-translate-router/).**


# Table of contents:
- [Installation](#installation)
- [Usage](#usage)
    - [Initialize module](#initialize-module)
    - [How it works](#how-it-works)
- [License](#license)

## Installation

using npm:
```
npm install --save @elham-oss/light-localize-router
```
using yarn:
```
yarn add --save @elham-oss/light-localize-router
```

## Usage

In order to use `@elham-oss/light-localize-router` you must initialize it with following information:
* Localization Config along with loader.


### Initialize module
`import { LightLocalizeRouterModule } from '@elham-oss/light-localize-router';`

* you need to add configure ngx-translate/core as described here [ngx-translate/core](https://github.com/ngx-translate/core)*

```ts
import { Location } from '@angular/common';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AbstractParser, HttpLoader, LightLocalizeRouterModule } from '@elham-oss/light-localize-router';

imports: [
    TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClientTrans]
        }
    }),
    RouterModule.forRoot(routes),
    LightLocalizeRouterModule.forRoot({
        parser: {
          provide: AbstractParser,
          useFactory: (translate, location, injector, platformId, http) => {
            return new HttpLoader(translate, location, http, injector, platformId)
          },
          deps: [TranslateService, Location, Injector, PLATFORM_ID, HttpClient]
        }
    })
]
```


### How it works

after you add `@elham-oss/light-localize-router` to your project it will work like [angular-l10n](https://github.com/robisim74/angular-l10n/) routing but for [ngx-translate/core](https://github.com/ngx-translate/core):

A prefix containing the language is added to the path of each navigation, creating a semantic URL:
```
baseHref/[language][-script][-region]/path

https://example.com/en/home
https://example.com/en-US/home
```

If the localized link is called, the _locale_ is also set automatically.

To achieve this, the router configuration in your app is not rewritten: the URL is replaced, in order to provide the different localized contents both to the crawlers and to the users that can refer to the localized links.

If you don't want a localized routing for _default locale_, you can enable it during the configuration:
```json
{
    "defaultRouting": true
}
```

you can also create your own loader instead of http loader and provide the configuration for the library.
