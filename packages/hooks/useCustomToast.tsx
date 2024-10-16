import { useToast } from "@chakra-ui/react";

import { LocalizedText, type TranslationNS } from "@packages/features/i18n-context";

export default function useCustomToast(source: TranslationNS) {
  const toast = useToast();

  const errorToast = (key: string) =>
    toast({
      description: <LocalizedText translation={`${source}.${key}`} />,
      status: "error",
      isClosable: true,
    });

  const successToast = (key: string) =>
    toast({
      description: <LocalizedText translation={`${source}.${key}`} />,
      status: "success",
      isClosable: true,
    });

  return { errorToast, successToast };
}
