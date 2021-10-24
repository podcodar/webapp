import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import Layout from '@packages/components/Layout';
import Metadata from '@packages/components/Metadata';
import ModalProvider from '@packages/features/modal-context';
import I18nProvider from '@packages/features/i18n-context';
import { withProviders } from '@packages/utils/react';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return withProviders(
    <Layout>
      <CSSReset />
      <Metadata />
      <Component {...pageProps} />
    </Layout>,
    providers,
  );
}

const providers = [ModalProvider, ChakraProvider, I18nProvider];

export default MyApp;
