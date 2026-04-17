/**
 * Footer / social presence. Update hrefs if a handle or invite URL changes.
 */
export type SocialNetwork = 'github' | 'linkedin' | 'instagram' | 'youtube' | 'x' | 'discord';

export type FooterSocialLink = {
	href: string;
	/** Screen reader label (pt-BR). */
	label: string;
	network: SocialNetwork;
};

/** Iconify ids for `astro-icon` + `@iconify-json/simple-icons`. */
export const footerSocialIconify: Record<SocialNetwork, string> = {
	github: 'simple-icons:github',
	linkedin: 'simple-icons:linkedin',
	instagram: 'simple-icons:instagram',
	youtube: 'simple-icons:youtube',
	x: 'simple-icons:x',
	discord: 'simple-icons:discord',
};

export const footerSocialLinks: FooterSocialLink[] = [
	{
		network: 'github',
		href: 'https://github.com/podcodar',
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
		href: 'https://www.youtube.com/@podcodar',
		label: 'PodCodar no YouTube',
	},
	{
		network: 'x',
		href: 'https://x.com/podcodar',
		label: 'PodCodar no X',
	},
	{
		network: 'discord',
		href: 'https://discord.com/invite/podcodar',
		label: 'PodCodar no Discord',
	},
];
