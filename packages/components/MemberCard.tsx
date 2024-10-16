"use client";

import { Avatar, Center, Flex, Grid, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";

import { LocalizedText } from "@packages/features/i18n-context";
import type { SelectMember } from "@packages/repositories/db/schema";
import SocialIconLinks from "./SocialIconLinks";

interface Props {
  member: SelectMember;
}

export default function MemberCard({ member }: Props) {
  const bgColorBody = useColorModeValue("white", "gray.700");
  const colorTextLighter = useColorModeValue("gray.400", "gray.500");

  return (
    <Center w="full" bg={bgColorBody} boxShadow="xl" rounded="md" textAlign="center" flexDirection="column">
      <Image h="7rem" w="full" src={member.cover} objectFit="cover" alt="member cover" />
      <Flex justify="center" mt="-12">
        <Avatar size="xl" src={member.avatar} border="2px solid white" />
      </Flex>
      <Grid gap=".5rem" p="1rem">
        <Heading fontSize="2xl" fontWeight={500}>
          {member.name}
        </Heading>
        <Text fontSize="md" color={colorTextLighter}>
          <LocalizedText translation={`team-page.role.${member.role}`} />
        </Text>
        <SocialIconLinks githubUrl={member.github} linkedinUrl={member.linkedin} />
      </Grid>
    </Center>
  );
}
