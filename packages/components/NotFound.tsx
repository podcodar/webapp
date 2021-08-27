import { Box, Heading, Text, Stack } from '@chakra-ui/layout';

import Lottie from '@packages/components/Lottie';

export default function NotFound() {
  return (
    <Box>
      <Stack
        textAlign="center"
        align="center"
        spacing={{ base: 8, md: 10 }}
        pt="0.5rem"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="110%"
        >
          Não encontramos sua página
          <Text as="span" color="purple.400">
            (╯°□°)╯︵ ┻━┻
          </Text>
        </Heading>
        <Text color="gray.500" maxW="3xl">
          Mas encontramos esse abacate!
        </Text>
        <Lottie animation="avocado" />
      </Stack>
    </Box>
  );
}
