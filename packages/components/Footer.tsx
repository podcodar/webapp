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
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo />
            </Box>
            <Text fontSize="sm">© 2021 PodCodar. All rights reserved</Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Produtos</ListHeader>
            <Link href="#">Overview</Link>
            <Link href="#">Features</Link>
            <Link href="#">Tutorials</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Releases</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Quem somos</ListHeader>
            <Link href="#">About</Link>
            <Link href="#">Press</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Contact</Link>
            <Link href="#">Partners</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Suporte</ListHeader>
            <Link href="#">Help Center</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Legal</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Status</Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Redes</ListHeader>
            <Link href="https://github.com/podcodar">Github</Link>
            <Link href="https://www.linkedin.com/company/podcodar/">
              LinkedIn
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
