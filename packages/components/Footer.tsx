import { ReactNode } from 'react';
import {
  Box,
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
    <Box bg={bgColor} color={color} py="1.5rem" px="1.5rem">
      <SimpleGrid
        templateColumns={{ sm: '1fr', md: '8fr 2fr 2fr' }}
        spacing="2rem"
      >
        <Stack spacing="1rem">
          <Box>
            <Logo />
          </Box>
          <Text fontSize="sm">
            © {new Date().getFullYear()} Podcodar. {t(`legal`)}
          </Text>
        </Stack>
        <Stack align="flex-start">
          <ListHeader>{t(`socials`)}</ListHeader>
          {socialLinks}
        </Stack>
        <Stack align="flex-start">
          <ListHeader>{t(`support`)}</ListHeader>
          {supportLinks}
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
