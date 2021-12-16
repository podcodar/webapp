import {
  Flex,
  SkeletonCircle,
  Box,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

export default function FakeCard() {
  return (
    <Box
      w="full"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="2xl"
      rounded="md"
      overflow="hidden"
      h="35vh"
      flexShrink={0}
      flexGrow={0}
    >
      <Skeleton h="15vh" w="full" objectFit="cover" speed={5} />
      <Flex justify="center" w="full">
        <SkeletonCircle size="20" mt="-12" speed={5} />
      </Flex>
      <Stack mt="10" spacing={3}>
        <Skeleton h="15px" speed={5} w="80%" alignSelf="center" />
        <Skeleton h="15px" speed={5} w="80%" alignSelf="center" />
        <Skeleton h="15px" speed={5} w="80%" alignSelf="center" />
      </Stack>
    </Box>
  );
}
