import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import Layout from '@packages/components/Layout';
import Metadata from '@packages/components/Metadata';
import ModalProvider from '@packages/features/modal-context';

import I18nProvider from '#/packages/features/i18n-context';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <ChakraProvider>
        <ModalProvider>
          <Layout>
            <CSSReset />
            <Metadata />
            <Component {...pageProps} />
          </Layout>
        </ModalProvider>
      </ChakraProvider>
    </I18nProvider>
  );
}
export default MyApp;
