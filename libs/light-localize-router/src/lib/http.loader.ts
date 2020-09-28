import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ParserConfig } from './contracts/parser-config.contract';
import { AbstractParser } from './parser';

@Injectable({
    providedIn: 'root'
})
export class HttpLoader extends AbstractParser {

    constructor(translate: TranslateService,
                location: Location, private http: HttpClient,
                injector: Injector,
                @Inject(PLATFORM_ID) platformId: Record<string, any>,
                private path: string = 'assets/locales.json') {
        super(translate, injector, location, platformId);
    }
    /**
     * Initialize or append routes
     */
    load(): Promise<any> {
        return new Promise((resolve: any) => {
            this.http.get(`${this.path}`)
                .subscribe((data: ParserConfig) => {
                    this.locales = data.locales;
                    this.defaultRouting = data.defaultRouting ;
                    this.format = data.format ?? 'language-region';
                    this.prefix = data.prefix || '';
                    this.escapePrefix = data.escapePrefix || '';
                    console.log(this.locales);
                    this.init().then(resolve);
                });
        });
    }
}
