import { Heading, Flex, Text } from '@chakra-ui/react';
import { Trans } from 'react-i18next';
import Head from 'next/head';

import { useI18n } from '@packages/features/i18n-context';
import { title } from '@packages/config/site';
import Section from '@packages/components/Section';

export default function AskUsPage() {
  const { t } = useI18n('ask-us-page');
  return (
    <Section py="10rem">
      <Head>
        <title>
          {t('head')} - {title}
        </title>
      </Head>
      <Flex justifyContent="center">
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="110%"
        >
          <Trans
            i18nKey={t(`title`)}
            components={{
              span: <Text as="span" color="purple.400" />,
            }}
          />
        </Heading>

        {/* TODO: show questions */}
      </Flex>
    </Section>
  );
}
