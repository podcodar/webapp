import { Stack, Text, useColorModeValue, Link } from '@chakra-ui/react';

import { TranslationNS, useI18n } from '@packages/features/i18n-context';

import Section from './Section';

export default function Footer() {
  const { t } = useI18n('footer');
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const currentYear = new Date().getFullYear();

  return (
    <Section p="1.5rem" bgColor={bgColor}>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={{ base: '5rem', sm: '3rem' }}
      >
        <Stack spacing="1rem" flex="1">
          <Text>{t('podcodar')}</Text>
          <Text fontSize="sm">{t(`legal`, { currentYear })}</Text>
        </Stack>

        <Stack>
          <HeaderTitle title="socials" />
          <LinksTransalated linksData={socialLinksData} ns="social-links" />
        </Stack>

        <Stack>
          <HeaderTitle title="support" />
          <LinksTransalated linksData={supportLinksData} ns="footer" />
        </Stack>
      </Stack>
    </Section>
  );
}

interface LinkItem {
  url: string;
  name: string;
  isExternal: boolean;
}

const socialLinksData: LinkItem[] = [
  { url: 'https://github.com/podcodar', name: 'github', isExternal: true },
  {
    url: 'https://www.linkedin.com/company/podcodar/',
    name: 'linkedin',
    isExternal: true,
  },
];

const supportLinksData: LinkItem[] = [
  { url: '/terms-of-service', name: 'terms', isExternal: false },
  { url: '/privacy-policy', name: 'privacy', isExternal: false },
];

interface HeaderTitleProps {
  title: string;
}

function HeaderTitle({ title }: HeaderTitleProps) {
  const { t } = useI18n('footer');
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {t(title)}
    </Text>
  );
}

interface LinksTransalatedProps {
  ns: TranslationNS;
  linksData: LinkItem[];
}

function LinksTransalated({ linksData, ns }: LinksTransalatedProps) {
  const { t } = useI18n(ns);
  return (
    <>
      {linksData.map((link) => (
        <Link href={link.url} isExternal={link.isExternal} key={link.name}>
          {t(link.name)}
        </Link>
      ))}
    </>
  );
}
