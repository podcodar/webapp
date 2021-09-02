import { Heading, Text, Stack } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/react';

import Lottie from '@packages/components/Lottie';

export default function NotFound() {
  return (
    <Container maxW="5xl" my="5rem">
      <Stack
        textAlign="center"
        align="center"
        spacing={{ base: 8, md: 10 }}
        pt="4rem"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="110%"
        >
          Não encontramos sua página
          <Text as="span" color="purple.400">
            {' '}
            (╯°□°)╯︵ ┻━┻
          </Text>
        </Heading>
        <Text color="gray.500" maxW="3xl">
          Mas encontramos esse abacate!
        </Text>
        <Lottie animation="avocado" />
      </Stack>
    </Container>
  );
}
