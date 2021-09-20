import { Link, Text } from '@chakra-ui/react';

import { useI18n } from '@packages/features/i18n-context';

export const socialLinksData = [
  { url: 'https://github.com/podcodar', name: 'Github' },
  { url: 'https://www.linkedin.com/company/podcodar/', name: 'LinkedIn' },
];
export const supportLinksData = [
  { url: '/terms-of-service', name: 'terms' },
  { url: '/privacy-policy', name: 'privacy' },
];

export const currentYear = new Date().getFullYear();
interface HeaderTitle {
  title: string;
}

export function HeaderTitle({ title }: HeaderTitle) {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2} key="title">
      {title}
    </Text>
  );
}

export function SocialLinks() {
  return (
    <>
      {socialLinksData.map((link) => (
        <Link href={link.url} key={link.name}>
          {link.name}
        </Link>
      ))}
    </>
  );
}

export function SupportLinks() {
  const { t } = useI18n('footer');
  return (
    <>
      {supportLinksData.map((link) => (
        <Link href={link.url} key={link.name}>
          {t(`${link.name}`)}
        </Link>
      ))}
    </>
  );
}
