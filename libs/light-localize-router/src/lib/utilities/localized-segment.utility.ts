import { formatLanguage } from './format-language.utility';
import { LanguageFormatType } from '../types/language-format.type';

export function getLocalizedSegment(path: string, locales: Array<string>, format: LanguageFormatType): string | null {
  for (const locale of locales) {
    const language = formatLanguage(locale, format);
    const regex = new RegExp(`(\/${language}\/)|(\/${language}$)`);
    const segments = path.match(regex);
    if (segments != null) {
      return segments[0];
    }
  }
  return null;
}
