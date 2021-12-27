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
  office: string;
  description: string;
}

export default function MemberCard({
  coverImage,
  profileImage,
  name,
  office,
  description,
}: Props) {
  const bgColorBody = useColorModeValue('white', 'gray.700');
  const colorTextLighter = useColorModeValue('gray.400', 'gray.500');
  const colorTextDarker = useColorModeValue('gray.500', 'gray.400');
  return (
    <Center py={6}>
      <Box
        maxW="14.75rem"
        w="full"
        bg={bgColorBody}
        boxShadow="xl"
        rounded="md"
        overflow="hidden"
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
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
        <Box p={3}>
          <Flex direction="column">
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              {name}
            </Heading>
            <Text fontSize="md" color={colorTextLighter}>
              {office}
            </Text>
            <Text color={colorTextDarker} fontSize="sm" lineHeight="115%">
              {description}
            </Text>
          </Flex>
          <Box alignItems="center">
            <SocialIconLinks />
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
