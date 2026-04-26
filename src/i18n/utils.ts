import { defaultLang, ui } from '@/i18n/ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const lang = url.pathname.split('/')[1];
  return lang && ui[lang as Lang] ? (lang as Lang) : defaultLang;
}

export function useTranslations(lang?: Lang) {
  return function t(key: string): string {
    const activeLang = lang ?? defaultLang;
    return (
      (ui[activeLang] as Record<string, string>)[key] ??
      (ui[defaultLang] as Record<string, string>)[key] ??
      key
    );
  };
}

function normalizePath(path: string | URL = '/'): string {
  const hrefStr = typeof path === 'string' ? path : (path.pathname ?? '/');

  if (!hrefStr || hrefStr === '/') return '/';
  return hrefStr.replace(/\/$/, '');
}

export function isActive(linkPath: string, currentPath: string): boolean {
  const normalizedLink = normalizePath(linkPath);
  const normalizedCurrent = normalizePath(currentPath);
  return normalizedLink.endsWith(normalizedCurrent);
}
