import { errorHandler } from '../exceptions/error.handler';
import { validateLanguage } from './validate-language.utility';
import { LanguageFormatType } from '../types/language-format.type';

export function formatLanguage(language: string, format: LanguageFormatType): string {
  if (language == null || language === '') return '';
  if (!validateLanguage(language)) throw errorHandler(formatLanguage, 'Invalid language');

  const [, LANGUAGE = '', SCRIPT = '', REGION = ''] = language.match(/^([a-z]{2,3})(\-[A-Z][a-z]{3})?(\-[A-Z]{2})?/) || [];
  switch (format) {
    case 'language':
      return LANGUAGE;
    case 'language-script':
      return LANGUAGE + SCRIPT;
    case 'language-region':
      return LANGUAGE + REGION;
    case 'language-script-region':
      return LANGUAGE + SCRIPT + REGION;
  }
}
