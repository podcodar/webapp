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

import SocialIconLinks from './SocialIconLinks';

interface Props {
  coverImage: string;
  profileImage: string;
  name: string;
  communityRole: string;
  description: string;
}

export default function MemberCard({
  coverImage,
  profileImage,
  name,
  communityRole,
  description,
}: Props) {
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
          src={coverImage}
          objectFit="cover"
          alt="member cover"
        />
        <Flex justify="center" mt="-12">
          <Avatar
            size="xl"
            src={profileImage}
            alt="Author"
            border="2px solid white"
          />
        </Flex>
        <Box p={3}>
          <Heading fontSize="2xl" fontWeight={500}>
            {name}
          </Heading>
          <Text fontSize="md" color={colorTextLighter}>
            {communityRole}
          </Text>
          <Text color={colorTextDarker} fontSize="sm" lineHeight="115%">
            {description}
          </Text>
          <SocialIconLinks />
        </Box>
      </Box>
    </Center>
  );
}
