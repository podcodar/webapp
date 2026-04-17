import { defaultLang, ui } from './ui';

/**
 * Get the current language from the URL pathname
 * @example "/es/about" -> "es"
 */
export function getLangFromUrl(url: URL): keyof typeof ui {
	const segments = url.pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];
	if (firstSegment && firstSegment in ui) {
		return firstSegment as keyof typeof ui;
	}
	return defaultLang;
}

/**
 * Get a translation function for the given language
 * Falls back to default language if key not found
 */
export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}
