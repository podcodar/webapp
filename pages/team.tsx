import { Heading, Flex, Text } from '@chakra-ui/react';
import { Trans } from 'react-i18next';

import { useI18n } from '@packages/features/i18n-context';
import Section from '@packages/components/Section';

export default function Team() {
  const { t } = useI18n('team-page');
  return (
    <Section py="10rem">
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
      </Flex>
    </Section>
  );
}
