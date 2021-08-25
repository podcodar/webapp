import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import { useModalActions } from '@packages/features/modal-context';

import { Illustration } from './icons';

export default function CallToActionWithIllustration() {
  const { open } = useModalActions();
  return (
    <Stack
      textAlign="center"
      align="center"
      spacing={{ base: 8, md: 10 }}
      pt="4rem"
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl' }}
        lineHeight="110%"
      >
        Formação profissional para o{' '}
        <Text as="span" color="purple.400">
          mercado de tecnologia.
        </Text>
      </Heading>
      <Text color="gray.500" maxW="3xl">
        Somos uma comunidade de tecnologia e computação que ensina programação
        com foco na formação de profissionais. Existimos para democratizar o
        conhecimento e o acesso às oportunidades de trabalho na área de
        tecnologia.
      </Text>
      <Stack spacing={6} direction="row">
        <Button
          rounded="full"
          px={6}
          colorScheme="purple"
          bg="purple.400"
          _hover={{ bg: 'purple.500' }}
          onClick={open}
        >
          Faça parte!
        </Button>
        <Button rounded="full" px={6}>
          Como funciona?
        </Button>
      </Stack>
      <Flex w="full">
        <Illustration height={{ sm: '24rem', lg: '28rem' }} />
      </Flex>
    </Stack>
  );
}
