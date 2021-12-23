import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
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

export default function MemberCardProfile({
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
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
      >
        <Image
          h="6.75rem"
          w="full"
          src={coverImage}
          objectFit="cover"
          alt="memberPhoto"
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
          <Flex textAlign="center" direction="column">
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              {name}
            </Heading>
            <Text fontSize="md" color={colorTextLighter}>
              {office}
            </Text>
          </Flex>

          <Stack direction="row" justify="center" spacing={5}>
            <Stack textAlign="center">
              <Text color={colorTextDarker} fontSize="sm" lineHeight="115%">
                {description}
              </Text>
            </Stack>
          </Stack>
          <Box py={2} px={6}>
            <SocialIconLinks />
          </Box>
        </Box>
      </Box>
    </Center>
  );
}
