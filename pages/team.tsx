import { Heading, Text, Grid, Center, Button } from "@chakra-ui/react";
import { Trans } from "react-i18next";

import { useI18n } from "@packages/features/i18n-context";
import Section from "@packages/components/Section";
import MemberCard from "@packages/components/MemberCard";
import { getMemberInstance } from "@packages/services/members";
import SkeletonMemberCard from "@packages/components/SkeletonMemberCard";

import type { Member } from "@packages/entities/members";
import type { GetStaticProps } from "next";

interface Props {
  members: Member[] | null;
  error: string | null;
}

export default function Team({ members, error }: Props) {
  const { t } = useI18n("team-page");

  return (
    <Section py="10rem">
      <Grid gap={10}>
        <Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%" textAlign="center">
          <Trans
            i18nKey={t("title")}
            components={{
              span: <Text as="span" color="purple.400" />,
            }}
          />
        </Heading>

        {error != null ? (
          error
        ) : members === null ? (
          <SkeletonMemberCard />
        ) : members.length === 0 ? (
          <Center>{t("no-items")}</Center>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: 4, lg: 6 }}
          >
            {members.map((member) => {
              return <MemberCard member={member} key={member.id} />;
            })}
          </Grid>
        )}
      </Grid>
    </Section>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const membersService = getMemberInstance();

  let members: Member[] | null = null;
  let error: Error | null = null;

  try {
    members = processMembers(await membersService.list());
  } catch (e) {
    error = e as Error;
  }

  return {
    revalidate: 100, // In Seconds
    // will be passed to the page component as props
    props: { members, error: error?.message || null },
  };
};

const processMembers = (members: Member[]): Member[] =>
  members.map((member) => ({
    ...member,
    name: shortName(member.name),
  }));

const shortName = (name: string) => name.split(" ").slice(0, 2).join(" ");
