import { Flex, SkeletonCircle, Box, Skeleton, Grid, useColorModeValue } from "@chakra-ui/react";

export default function SkeletonMemberCard() {
  const colorMode = useColorModeValue("white", "gray.800");
  return (
    <Box w="full" bg={colorMode} boxShadow="xl" rounded="md" pb="2rem">
      <Skeleton h="8rem" w="full" speed={5} />
      <Flex justify="center" mt="-12" w="full">
        <SkeletonCircle size="20" speed={5} />
      </Flex>
      <Grid gap="1rem" p="1rem">
        <Skeleton h="1rem" speed={5} />
        <Skeleton h="1rem" speed={5} />
        <Skeleton h="1rem" speed={5} />
      </Grid>
    </Box>
  );
}
