import { ReactNode } from 'react';
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Logo } from '@packages/components/icons';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const color = useColorModeValue('gray.700', 'gray.200');
  return (
    <Box bg={bgColor} color={color}>
      <Container as={Stack} maxW="6xl" py="1.5rem">
        <SimpleGrid
          templateColumns={{ sm: '1fr', md: '8fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing="1rem">
            <Box>
              <Logo />
            </Box>
            <Text fontSize="sm">
              © 2021 PodCodar. Todos os direitos reservados/All rights reserved
            </Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Redes</ListHeader>
            <Link href="https://github.com/podcodar">Github</Link>
            <Link href="https://www.linkedin.com/company/podcodar/">
              LinkedIn
            </Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Suporte</ListHeader>
            <Link href="/terms-of-service">
              Termos de serviço/Terms of Service
            </Link>
            <Link href="/privacy-policy">
              Politica de privacidade/Privacy Policy
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
