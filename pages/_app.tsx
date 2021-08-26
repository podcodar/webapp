import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import Layout from '@packages/components/Layout';
import Metadata from '@packages/components/Metadata';
import ModalProvider from '@packages/features/modal-context';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ModalProvider>
        <Layout>
          <CSSReset />
          <Metadata />
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </ChakraProvider>
  );
}
export default MyApp;
