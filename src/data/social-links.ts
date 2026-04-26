/**
 * Footer / social presence. Update hrefs if a handle or invite URL changes.
 */
const SOCIAL_LINKS = ['github', 'linkedin', 'instagram', 'youtube'] as const;

export type SocialNetwork = (typeof SOCIAL_LINKS)[number];

export type SocialLink = {
  href: string;
  /** Screen reader label (pt-BR). */
  label: string;
  /** Iconify id for astro-icon. */
  icon: string;
  network: SocialNetwork;
};

export const socialLinks: SocialLink[] = [
  {
    network: 'github',
    icon: 'simple-icons:github',
    href: 'https://github.com/podcodar/',
    label: 'PodCodar no GitHub',
  },
  {
    network: 'linkedin',
    icon: 'simple-icons:linkedin',
    href: 'https://www.linkedin.com/company/podcodar/',
    label: 'PodCodar no LinkedIn',
  },
  {
    network: 'instagram',
    icon: 'simple-icons:instagram',
    href: 'https://www.instagram.com/podcodar/',
    label: 'PodCodar no Instagram',
  },
  {
    network: 'youtube',
    icon: 'simple-icons:youtube',
    href: 'https://www.youtube.com/@podcodar5070/',
    label: 'PodCodar no YouTube',
  },
];
