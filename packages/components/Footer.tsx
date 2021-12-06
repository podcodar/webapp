import { Stack, Text, useColorModeValue, Image } from '@chakra-ui/react';

import Link from '@packages/components/Link';
import { useI18n } from '@packages/features/i18n-context';
import { PIX_KEY, links, images } from '@packages/config/site';

import Section from './Section';

export default function Footer() {
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Section p="1.5rem" bgColor={bgColor}>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={{ base: '5rem', sm: '3rem' }}
      >
        <Pix />

        <Copyrights />

        <SocialLinks />
      </Stack>
    </Section>
  );
}

interface LinkItem {
  url: string;
  name: string;
  isExternal: boolean;
}

const socialLinks: LinkItem[] = [
  { url: links.github, name: 'github', isExternal: true },
  { url: links.linkedin, name: 'linkedin', isExternal: true },
];

function SocialLinks() {
  const { t } = useI18n('social-links');
  return (
    <Stack>
      <Text fontWeight="500" fontSize="lg" mb={2}>
        {t('socials')}
      </Text>

      {socialLinks.map((link) => (
        <Link href={link.url} isExternal={link.isExternal} key={link.name}>
          {t(link.name)}
        </Link>
      ))}
    </Stack>
  );
}

function Pix() {
  const { t } = useI18n('footer');
  return (
    <Stack spacing="0.1rem" flex="0.3">
      <Text>{t('contribution')}</Text>
      <Text fontSize="sm" color="#718096">
        {PIX_KEY}
      </Text>
      <Image src={images.pixQRCode} width="50%" alt={t('contribution')} />
    </Stack>
  );
}

function Copyrights() {
  const { t } = useI18n('footer');
  const currentYear = new Date().getFullYear();
  return (
    <Stack spacing="1rem" flex="0.5">
      <Text>{t('podcodar')}</Text>
      <Text fontSize="sm">{t(`legal`, { currentYear })}</Text>
    </Stack>
  );
}
