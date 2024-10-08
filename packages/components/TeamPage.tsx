"use client";
import { Center, Grid, Heading, Text } from "@chakra-ui/react";
import { Trans } from "react-i18next";

import MemberCard from "@packages/components/MemberCard";
import Section from "@packages/components/Section";
import SkeletonMemberCard from "@packages/components/SkeletonMemberCard";
import { useI18n } from "@packages/features/i18n-context";
import type { SelectMember } from "@packages/repositories/db/schema";

type Props = {
  members: SelectMember[];
};

export default function TeamPage({ members }: Props) {
  const { t } = useI18n("team-page");

  return (
    <Section className="py-40">
      <Grid gap={10}>
        <Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%" textAlign="center">
          <Trans
            i18nKey={t("title")}
            components={{
              span: <Text as="span" color="purple.400" />,
            }}
          />
        </Heading>

        {members === null ? (
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
