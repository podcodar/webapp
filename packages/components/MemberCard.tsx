import { Heading, Avatar, Center, Image, Flex, Text, Grid, useColorModeValue } from "@chakra-ui/react";

import { useI18n } from "@packages/features/i18n-context";

import SocialIconLinks from "./SocialIconLinks";

import type { Member } from "@packages/entities/members";

interface Props {
	member: Member;
}

export default function MemberCard({ member }: Props) {
	const bgColorBody = useColorModeValue("white", "gray.700");
	const colorTextLighter = useColorModeValue("gray.400", "gray.500");
	const { t } = useI18n("team-page");

	return (
		<Center w="full" bg={bgColorBody} boxShadow="xl" rounded="md" textAlign="center" flexDirection="column">
			<Image h="7rem" w="full" src={member.images.cover} objectFit="cover" alt="member cover" />
			<Flex justify="center" mt="-12">
				<Avatar size="xl" src={member.images.profile} border="2px solid white" />
			</Flex>
			<Grid gap=".5rem" p="1rem">
				<Heading fontSize="2xl" fontWeight={500}>
					{member.name}
				</Heading>
				<Text fontSize="md" color={colorTextLighter}>
					{t(`role.${member.communityRole}`)}
				</Text>
				<SocialIconLinks githubUrl={member.social.github} linkedinUrl={member.social.linkedin} />
			</Grid>
		</Center>
	);
}
