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
import { useI18n } from '@packages/features/i18n-context';

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
  const { t } = useI18n('footer');
  return (
    <Box bg={bgColor} color={color}>
      <Container as={Stack} maxW="6xl" py="1.5rem">
        <SimpleGrid
          templateColumns={{ sm: '1fr', md: '8fr 2fr 2fr' }}
          spacing={8}
        >
          <Stack spacing="1rem">
            <Box>
              <Logo />
            </Box>
            <Text fontSize="sm">2021 Podcodar. {t(`legal`)}</Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>{t(`socials`)}</ListHeader>
            <Link href="https://github.com/podcodar">Github</Link>
            <Link href="https://www.linkedin.com/company/podcodar/">
              LinkedIn
            </Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>{t(`support`)}</ListHeader>
            <Link href="/terms-of-service">{t(`terms`)}</Link>
            <Link href="/privacy-policy">{t(`privacy`)}</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
