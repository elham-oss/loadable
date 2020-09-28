export function validateLanguage(language: string): boolean {
  const regExp = new RegExp(/^([a-z]{2,3})(\-[A-Z][a-z]{3})?(\-[A-Z]{2})?(-u.+)?$/);
  return regExp.test(language);
}
