import { Heading, Stack, Text } from "@chakra-ui/layout";

import Section from "@packages/components/Section";

export default function PageNotFound() {
  return (
    <Section className="px-0 pt-32">
      <Stack textAlign="center" align="center" spacing={{ base: 2, md: 4 }}>
        <Heading fontWeight={600} fontSize={{ base: "3xl", sm: "4xl" }} lineHeight="110%">
          Não encontramos sua página
        </Heading>
        <Text color="purple.400">(╯°□°)╯︵ ┻━┻</Text>
        <Text color="gray.500" maxW="3xl">
          Mas encontramos esse abacate!
        </Text>
      </Stack>
    </Section>
  );
}
