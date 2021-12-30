import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { t } from 'i18next';

import { Member } from '@packages/entities/members';

import SocialIconLinks from './SocialIconLinks';

interface Props {
  member: Member;
}

export default function MemberCard({ member }: Props) {
  const bgColorBody = useColorModeValue('white', 'gray.700');
  const colorTextLighter = useColorModeValue('gray.400', 'gray.500');
  const colorTextDarker = useColorModeValue('gray.500', 'gray.400');
  return (
    <Center>
      <Box
        w="full"
        bg={bgColorBody}
        boxShadow="xl"
        rounded="md"
        textAlign="center"
      >
        <Image
          h="7rem"
          w="full"
          src={member.images.cover}
          objectFit="cover"
          alt="member cover"
        />
        <Flex justify="center" mt="-12">
          <Avatar
            size="xl"
            src={member.images.profile}
            alt="Author"
            border="2px solid white"
          />
        </Flex>
        <Box p={3}>
          <Heading fontSize="2xl" fontWeight={500}>
            {member.name}
          </Heading>
          <Text fontSize="md" color={colorTextLighter}>
            {t(member.communityRole)}
          </Text>
          <Text color={colorTextDarker} fontSize="sm" lineHeight="115%">
            {member.bio}
          </Text>
          <SocialIconLinks />
        </Box>
      </Box>
    </Center>
  );
}
