// ── Mission ──────────────────────────────────────────────────────────────────

export const mission = {
  titleKey: 'marketing.mission.title',
  bodyKeys: ['marketing.mission.body.0', 'marketing.mission.body.1', 'marketing.mission.body.2'],
} as const;

// ── Activities ───────────────────────────────────────────────────────────────

export type Activity = {
  titleKey: string;
  descKey: string;
  icon: 'interview' | 'career' | 'groups' | 'project' | 'cafe' | 'workshop';
};

export const activities: Activity[] = [
  {
    icon: 'interview',
    titleKey: 'marketing.activities.interview.title',
    descKey: 'marketing.activities.interview.desc',
  },
  {
    icon: 'career',
    titleKey: 'marketing.activities.career.title',
    descKey: 'marketing.activities.career.desc',
  },
  {
    icon: 'groups',
    titleKey: 'marketing.activities.groups.title',
    descKey: 'marketing.activities.groups.desc',
  },
  {
    icon: 'project',
    titleKey: 'marketing.activities.project.title',
    descKey: 'marketing.activities.project.desc',
  },
  {
    icon: 'cafe',
    titleKey: 'marketing.activities.cafe.title',
    descKey: 'marketing.activities.cafe.desc',
  },
  {
    icon: 'workshop',
    titleKey: 'marketing.activities.workshop.title',
    descKey: 'marketing.activities.workshop.desc',
  },
] as const;

// ── Testimonials ─────────────────────────────────────────────────────────────

export type Testimonial = {
  id: number;
  nameKey: string;
  role?: string;
  avatarUrl: string;
  profileUrl: string;
  quoteKey: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    nameKey: 'marketing.testimonials.1.name',
    quoteKey: 'marketing.testimonials.1.quote',
    avatarUrl: 'https://avatars.githubusercontent.com/u/18710340?v=4',
    profileUrl: 'https://github.com/giovannand',
  },
  {
    id: 2,
    nameKey: 'marketing.testimonials.2.name',
    quoteKey: 'marketing.testimonials.2.quote',
    avatarUrl: 'https://avatars.githubusercontent.com/u/57193296?v=4',
    profileUrl: 'https://github.com/borgesgfj',
  },
  {
    id: 3,
    nameKey: 'marketing.testimonials.3.name',
    quoteKey: 'marketing.testimonials.3.quote',
    avatarUrl: 'https://avatars.githubusercontent.com/u/65319425?v=4',
    profileUrl: 'https://github.com/Filipe-barbosa',
  },
  {
    id: 4,
    nameKey: 'marketing.testimonials.4.name',
    quoteKey: 'marketing.testimonials.4.quote',
    avatarUrl: 'https://avatars.githubusercontent.com/u/73261443?v=4',
    profileUrl: 'https://github.com/Guilherme-BS',
  },
] as const;

// ── How to Help ──────────────────────────────────────────────────────────────

export type HelpPath = {
  titleKey: string;
  descKey: string;
  href: string;
  ctaKey: string;
};

export const howToHelp: HelpPath[] = [
  {
    titleKey: 'marketing.help.donations.title',
    descKey: 'marketing.help.donations.desc',
    href: '/contact',
    ctaKey: 'marketing.help.donations.cta',
  },
  {
    titleKey: 'marketing.help.volunteering.title',
    descKey: 'marketing.help.volunteering.desc',
    href: '/contributing',
    ctaKey: 'marketing.help.volunteering.cta',
  },
  {
    titleKey: 'marketing.help.partnerships.title',
    descKey: 'marketing.help.partnerships.desc',
    href: '/contact',
    ctaKey: 'marketing.help.partnerships.cta',
  },
] as const;

// ── Core Values ──────────────────────────────────────────────────────────────

export const coreValues = [
  { titleKey: 'marketing.values.inclusion.title', textKey: 'marketing.values.inclusion.text' },
  {
    titleKey: 'marketing.values.collaboration.title',
    textKey: 'marketing.values.collaboration.text',
  },
  { titleKey: 'marketing.values.quality.title', textKey: 'marketing.values.quality.text' },
] as const;

// ── About Community ──────────────────────────────────────────────────────────

export const aboutCommunity = {
  titleKey: 'marketing.community.title',
  leadKey: 'marketing.community.lead',
  pointKeys: [
    'marketing.community.point.1',
    'marketing.community.point.2',
    'marketing.community.point.3',
  ],
} as const;

// ── Projects ─────────────────────────────────────────────────────────────────

export type ProjectItem = {
  nameKey: string;
  descKey: string;
  href: string;
};

export const projects: ProjectItem[] = [
  {
    nameKey: 'marketing.projects.site.name',
    descKey: 'marketing.projects.site.desc',
    href: 'https://github.com/podcodar/webapp',
  },
  {
    nameKey: 'marketing.projects.github.name',
    descKey: 'marketing.projects.github.desc',
    href: 'https://github.com/podcodar',
  },
] as const;

// ── Events ───────────────────────────────────────────────────────────────────

export const eventsBlock = {
  titleKey: 'marketing.events.title',
  bodyKey: 'marketing.events.body',
  ctaKey: 'marketing.events.cta',
  externalHref: 'https://github.com/podcodar',
} as const;

// ── Communication Channels ───────────────────────────────────────────────────

export type ChannelColor = 'emerald' | 'violet' | 'blue';

export type CommunicationChannel = {
  nameKey: string;
  descKey: string;
  icon: string;
  color: ChannelColor;
};

export const communicationChannels: CommunicationChannel[] = [
  {
    nameKey: 'marketing.channels.whatsapp.name',
    descKey: 'marketing.channels.whatsapp.desc',
    icon: 'lucide:message-circle',
    color: 'emerald',
  },
  {
    nameKey: 'marketing.channels.discord.name',
    descKey: 'marketing.channels.discord.desc',
    icon: 'simple-icons:discord',
    color: 'violet',
  },
  {
    nameKey: 'marketing.channels.meet.name',
    descKey: 'marketing.channels.meet.desc',
    icon: 'lucide:video',
    color: 'blue',
  },
] as const;
