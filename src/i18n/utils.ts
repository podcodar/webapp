import { defaultLang, ui } from '@/i18n/ui';

export type Lang = keyof typeof ui;

/**
 * Idioma do site (pt-BR). Rotas em inglês foram removidas.
 */
export function getLangFromUrl(_url: URL): Lang {
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key];
	};
}
