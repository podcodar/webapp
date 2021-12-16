import { GetStaticProps } from 'next';
import { Heading, Flex, Text, Grid } from '@chakra-ui/react';
import { Trans } from 'react-i18next';

import { useI18n } from '@packages/features/i18n-context';
import Section from '@packages/components/Section';
import FakeCard from '@packages/components/FakeCard';
import { Member } from '@packages/entities/members';
import { getMemberInstance } from '@packages/services/members';

interface Props {
  members: Member[] | null;
  error: Error | null;
}

export default function Team({ members, error }: Props) {
  const { t } = useI18n('team-page');
  console.log(members, error);
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

      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={{ base: 4, lg: 6 }}
        mt={10}
      >
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <FakeCard key={index} />
          ))}
      </Grid>
      {/* TODO: add member cards here */}
      {/* <div>
        {error != null
          ? error.message
          : members?.map((m) => (
              <p key={m.id}>
                {m.id} {m.name} {m.role}
              </p>
            ))}
      </div> */}
    </Section>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const membersService = getMemberInstance();

  let members: Member[] | null = null;
  let error: Error | null = null;

  try {
    members = await membersService.list();
  } catch (e) {
    error = e as Error;
  }

  return {
    revalidate: 100, // In Seconds
    // will be passed to the page component as props
    props: { members, error },
  };
};
