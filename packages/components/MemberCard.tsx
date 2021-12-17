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

export default function MemberCardProfile() {
  return (
    <Center py={6}>
      <Box
        maxW="14.75rem"
        w="full"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="2xl"
        rounded="md"
        overflow="hidden"
      >
        <Image
          h="6.75rem"
          w="full"
          src="https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          objectFit="cover"
          alt="memberPhoto"
        />
        <Flex justify="center" mt="-12">
          <Avatar
            size="xl"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            alt="Author"
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={3}>
          <Flex textAlign="center" direction="column">
            <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
              John Doe
            </Heading>
            <Text
              fontSize="md"
              color={useColorModeValue('gray.400', 'gray.500')}
            >
              Frontend Developer
            </Text>
          </Flex>

          <Stack direction="row" justify="center" spacing={5}>
            <Stack textAlign="center">
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize="sm"
                lineHeight="115%"
              >
                Full Stack maker & UI / UX Designer , love hip hop music Author
                of Building UI.
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
