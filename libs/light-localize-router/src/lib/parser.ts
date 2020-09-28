import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Router, Routes, NavigationStart, NavigationEnd  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { getLocalizedSegment } from './utilities/localized-segment.utility';
import { formatLanguage } from './utilities/format-language.utility';
import { toLocalizedPath } from './utilities/localized-path.utility';
import { LanguageFormatType } from './types/language-format.type';

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractParser {
    locales: Array<string>;
    format: LanguageFormatType;
    currentLang: string;
    routes: Routes;
    defaultLang: string;
    defaultRouting: boolean;

    protected prefix: string;
    protected escapePrefix: string;

    private get router(): Router {
        return this.injector.get(Router);
    }

    protected constructor(@Inject(TranslateService) private translate: TranslateService, @Inject(Injector) private injector: Injector,
                          @Inject(Location) private location: Location,
                          @Inject(PLATFORM_ID) private platformId: Record<string, any>) {
    }
    /**
     * Load routes and fetch necessary data
     */
    abstract load(): Promise<any>;
    /**
     * Initialize language and routes
     */
    protected async init(): Promise<any> {
        // bind get latest used language
        // Parses the url to find the language when a navigation starts.
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationStart)
        ).subscribe({
            next: (event: NavigationStart) => {
                // Skips location change on pop state event and on first navigation.
                this.redirectToPath(event.url, event.navigationTrigger === 'popstate' || event.id === 1);
            }
        });

        // Replaces url when a navigation ends.
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd)
        ).subscribe({
            next: (event: NavigationEnd) => {
                const url = (event.url && event.url !== '/' && event.url === event.urlAfterRedirects) ?
                    event.url :
                    event.urlAfterRedirects;
                this.replacePath(this.translate.currentLang, url);
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            // Replaces url when locale changes.
            this.translate.onTranslationChange.subscribe({
                next: (locale: any) => {
                    this.replacePath(locale)
                }
            });
        }
    }

    /**
     * Removes the language from the path and navigates.
     * @param path Localized path
     * @param skipLocationChange When true, navigates without pushing a new state into history
     */
    private redirectToPath(path: string, skipLocationChange: boolean): void {

        const segment = getLocalizedSegment(path, this.locales, this.format);
        console.log('79', segment);
        if (segment != null) {
            const url = path.replace(segment, '/');
            this.translate.use(segment.replace('/', '').replace('/', ''));
            // navigateByUrl keeps the query params.
            this.router.navigateByUrl(url, { skipLocationChange });
        }
    }

    /**
     * Replaces the path with the language without pushing a new state into history.
     * @param locale The current locale
     * @param path The path to be replaced
     */
    private replacePath(locale: string, path?: string): void {
        if (locale === '') return;

        const language = formatLanguage(locale, this.format);
        if (path) {
            if (!this.isDefaultRouting()) {
                this.location.replaceState(toLocalizedPath(language, path, this.locales, this.format));
            }
        } else {
            path = this.location.path();
            const segment = getLocalizedSegment(path, this.locales, this.format);
            if (segment != null) {
                path = path.replace(segment, '/');

                if (this.isDefaultRouting()) {
                    this.location.replaceState(path);
                }
            }
            if (!this.isDefaultRouting()) {
                this.location.replaceState(toLocalizedPath(language, path, this.locales, this.format));
            }
        }
    }

    private isDefaultRouting(): boolean {
        console.log('defaultRouting', this.defaultRouting);
        if (!this.defaultRouting) return false;

        return formatLanguage(this.translate.currentLang ?? this.translate.defaultLang, this.format) ===
            formatLanguage(this.translate.defaultLang, this.format);
    }
}
