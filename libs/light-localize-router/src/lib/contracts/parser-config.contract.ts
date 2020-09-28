import { Provider } from '@angular/core';
import { LanguageFormatType } from '../types/language-format.type';

export interface ParserConfig {
  parser: Provider,
  defaultRouting?: boolean,
  locales?: Array<string>;
  prefix?: string;
  escapePrefix?: string;
  format?: LanguageFormatType;
}
