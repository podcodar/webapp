import { Heading, Stack, Text } from '@chakra-ui/react';
import { Trans } from 'react-i18next';

import { useI18n } from '@packages/features/i18n-context';

import Section from '../packages/components/Section';

function Team() {
  const { t } = useI18n('team-page');
  return (
    <Section py="10rem">
      <Stack textAlign="center" align="center" spacing={{ base: 8, md: 10 }}>
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
      </Stack>
    </Section>
  );
}

export default Team;
