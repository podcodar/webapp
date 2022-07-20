import { useToast } from '@chakra-ui/react';

import { useI18n } from '@packages/features/i18n-context';

export default function useCustomToast() {
  const { t } = useI18n('testimonials');
  const toast = useToast();

  const errorToast = () =>
    toast({
      description: t('toast.inputError'),
      status: 'error',
      isClosable: true,
    });

  const invalidUserToast = () =>
    toast({
      description: t('toast.invalidUserError'),
      status: 'error',
      isClosable: true,
    });

  const successToast = () =>
    toast({
      description: t('toast.success'),
      status: 'success',
      isClosable: true,
    });

  return { errorToast, invalidUserToast, successToast };
}
