/**
 * Footer / social presence. Update hrefs if a handle or invite URL changes.
 */
const SOCIAL_LINKS = ['github', 'linkedin', 'instagram', 'youtube'] as const;

export type SocialNetwork = (typeof SOCIAL_LINKS)[number];

export type SocialLink = {
  href: string;
  /** Screen reader label (pt-BR). */
  label: string;
  network: SocialNetwork;
};

/** Iconify ids for `astro-icon` + `@iconify-json/simple-icons`. */
export const socialIconify: Record<SocialNetwork, string> = {
  github: 'simple-icons:github',
  linkedin: 'simple-icons:linkedin',
  instagram: 'simple-icons:instagram',
  youtube: 'simple-icons:youtube',
};

export const socialLinks: SocialLink[] = [
  {
    network: 'github',
    href: 'https://github.com/podcodar/',
    label: 'PodCodar no GitHub',
  },
  {
    network: 'linkedin',
    href: 'https://www.linkedin.com/company/podcodar/',
    label: 'PodCodar no LinkedIn',
  },
  {
    network: 'instagram',
    href: 'https://www.instagram.com/podcodar/',
    label: 'PodCodar no Instagram',
  },
  {
    network: 'youtube',
    href: 'https://www.youtube.com/@podcodar5070/',
    label: 'PodCodar no YouTube',
  },
];
