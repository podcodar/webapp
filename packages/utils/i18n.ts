import { readdirSync, mkdirSync, writeFileSync } from 'fs';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { i18n as i18nClient } from 'next-i18next';

import { i18n } from '#/next-i18next.config';

export async function getTranslationProps(locale = '') {
  // generate i18n assets for all locales
  i18n.locales.map(generateI18nAssetsByLang);

  // reload i18n tokens
  await i18nClient?.reloadResources();

  // generate i18n server props
  const i18nDirs = getI18nDirs(locale);
  return await serverSideTranslations(locale, i18nDirs);
}

// this function generate json translation files based on yml files
async function generateI18nAssetsByLang(locale: string) {
  const { default: i18nFiles } = await import(`@packages/locale/${locale}.yml`);
  for (const [file, translations] of Object.entries(i18nFiles)) {
    const i18nAssetsPath = `./public/locales/${locale}`;
    mkdirSync(i18nAssetsPath, { recursive: true });
    writeFileSync(
      `${i18nAssetsPath}/${file}.json`,
      JSON.stringify(translations, null, 2),
    );
  }
}

function getI18nDirs(locale: string) {
  const removeFileExt = (file: string) => file.split('.').at(0)!;
  return readdirSync(`./public/locales/${locale}/`).map(removeFileExt);
}
