import { Button } from '@chakra-ui/react';

import { useI18nActions, useI18nStates } from '../features/i18n-context';

export default function ToggleLanguage() {
  const { locale } = useI18nStates();
  const { setLocale } = useI18nActions();
  const text = locale === 'en' ? '🇧🇷' : '🇺🇸';
  const handleToggle = () => setLocale(locale === 'en' ? 'pt' : 'en');

  return (
    <Button
      rounded="md"
      aria-label="Toggle language button"
      onClick={handleToggle}
    >
      {text}
    </Button>
  );
}
