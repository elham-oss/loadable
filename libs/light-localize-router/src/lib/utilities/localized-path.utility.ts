import { Location } from '@angular/common';
import { getLocalizedSegment } from './localized-segment.utility';
import { LanguageFormatType } from '../types/language-format.type';

export function toLocalizedPath(language: string, path: string, locales: Array<string>, format: LanguageFormatType): string {
  const segment = getLocalizedSegment(path, locales, format);
  if (segment != null && segment.includes(language)) return path;

  return Location.stripTrailingSlash('/' + language + path);
}
