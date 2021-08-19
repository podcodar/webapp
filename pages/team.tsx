import type { AppProps } from 'next/app';
import { Flex, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Layout from '@packages/components/Layout';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Metadata from '@packages/components/Metadata';
import ModalProvider from '@packages/features/modal-context';

function MyApp() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '4xl' }}
          lineHeight={'110%'}
        >
          Em breve apresentaremos nossos membros.{' '}
          <Text as={'span'} color={'purple.400'}>
            Aguarde!!!
          </Text>
        </Heading>
      </Stack>
    </Container>
  );
}
export default MyApp;
