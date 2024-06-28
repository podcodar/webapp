import { useToast } from '@chakra-ui/react';

import { type TranslationNS, useI18n } from '@packages/features/i18n-context';

export default function useCustomToast(source: string) {
  const { t } = useI18n(source as TranslationNS);
  const toast = useToast();

  const errorToast = (key: string) =>
    toast({
      description: t(key),
      status: 'error',
      isClosable: true,
    });

  const successToast = (key: string) =>
    toast({
      description: t(key),
      status: 'success',
      isClosable: true,
    });

  return { errorToast, successToast };
}
