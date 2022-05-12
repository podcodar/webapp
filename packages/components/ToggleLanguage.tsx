import { Button } from '@chakra-ui/react';

import { useI18nActions, useI18nStates } from '@packages/features/i18n-context';
import { USFlagIcon, BRFlagIcon } from '@packages/components/icons';

export default function ToggleLanguage() {
  const { locale } = useI18nStates();
  const { setLocale } = useI18nActions();
  const text =
    locale === 'en' ? (
      <BRFlagIcon style={{ width: '20px' }} />
    ) : (
      <USFlagIcon style={{ width: '20px' }} />
    );
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
