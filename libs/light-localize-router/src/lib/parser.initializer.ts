import { Injectable, Injector } from '@angular/core';
import { AbstractParser } from './parser';

@Injectable({
    providedIn: 'root'
})
export class ParserInitializer {
    parser: AbstractParser;
    constructor(private injector: Injector) {
    }
    appInitializer(): Promise<any> {
        return this.parser.load();
    }

    generateInitializer(parser: AbstractParser): () => Promise<any> {
        this.parser = parser;
        return this.appInitializer;
    }
}
