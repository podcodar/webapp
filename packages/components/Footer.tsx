import {
  Box,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';

import { Logo } from '@packages/components/icons';
import { useI18n } from '@packages/features/i18n-context';

export default function Footer() {
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const color = useColorModeValue('gray.700', 'gray.200');
  const { t } = useI18n('footer');

  const socialLinksData = [
    { url: 'https://github.com/podcodar', name: 'Github' },
    { url: 'https://www.linkedin.com/company/podcodar/', name: 'LinkedIn' },
  ];
  const supportLinksData = [
    { url: '/terms-of-service', name: t(`terms`) },
    { url: '/privacy-policy', name: t(`privacy`) },
  ];
  const socialLinks = socialLinksData.map((obj) => (
    <Link href={obj.url} key={obj.name}>
      {obj.name}
    </Link>
  ));
  const supportLinks = supportLinksData.map((obj) => (
    <Link href={obj.url} key={obj.name}>
      {obj.name}
    </Link>
  ));
  return (
    <Box bg={bgColor} color={color}>
      <Container as={Stack} py="1.5rem" px="1.5rem" maxW="100%">
        <SimpleGrid
          flexDirection={{ base: 'column', sm: 'row' }}
          spacing="5rem"
          display="flex"
          justifyContent="space-around"
        >
          <Stack spacing="1rem" flex="1 1 auto">
            <Box>
              <Logo />
            </Box>
            <Text fontSize="sm">
              © {new Date().getFullYear()} Podcodar. {t(`legal`)}
            </Text>
          </Stack>
          <Stack align="flex-start">
            <Header title={t(`socials`)} />
            {socialLinks}
          </Stack>
          <Stack align="flex-start">
            <Header title={t(`support`)} />
            {supportLinks}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

interface HeaderTitle {
  title: string;
}

function Header({ title }: HeaderTitle) {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {title}
    </Text>
  );
}
