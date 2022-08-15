import { Heading, Text, Stack } from '@chakra-ui/layout';

import Lottie from '@packages/components/Lottie';

import Section from './Section';

export default function NotFound() {
  return (
    <Section pb="0" pt="8rem">
      <Stack textAlign="center" align="center" spacing={{ base: 2, md: 4 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl' }}
          lineHeight="110%"
        >
          Não encontramos sua página
        </Heading>
        <Text color="purple.400">(╯°□°)╯︵ ┻━┻</Text>
        <Text color="gray.500" maxW="3xl">
          Mas encontramos esse abacate!
        </Text>
        <Lottie animation="alt" />
      </Stack>
    </Section>
  );
}
