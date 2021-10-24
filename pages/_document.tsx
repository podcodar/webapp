import Document, { Head, Html, Main, NextScript } from 'next/document';

import Metadata from '@packages/components/Metadata';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Metadata />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
