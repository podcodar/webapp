"use client";
import { Heading, Text, Grid, Center } from "@chakra-ui/react";
import { Trans } from "react-i18next";

import { useI18n } from "@packages/features/i18n-context";
import Section from "@packages/components/Section";
import MemberCard from "@packages/components/MemberCard";
import { getMemberInstance } from "@packages/services/members";
import SkeletonMemberCard from "@packages/components/SkeletonMemberCard";

import type { Member } from "@packages/entities/members";

const membersService = getMemberInstance();

export default async function Team() {
  const { t } = useI18n("team-page");
  const members = processMembers(await membersService.list());

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

const processMembers = (members: Member[]): Member[] =>
  members.map((member) => ({
    ...member,
    name: shortName(member.name),
  }));

const shortName = (name: string) => name.split(" ").slice(0, 2).join(" ");
