/** User-facing copy for the landing and institutional pages (pt-BR strings). */

export const hero = {
  eyebrow: 'PodCodar',
  headline: 'Educação em tecnologia, feita em comunidade',
  subhead:
    'Somos uma comunidade e organização sem fins lucrativos focada em transformar a vida de brasileiros por meio da educação profissionalizante em tecnologia — com mentoria, estudos em grupo e projetos reais.',
  /** Short line in the hero side card */
  cardTagline: 'Democratizar o acesso ao conhecimento. Estudar junto. Crescer com propósito.',
  primaryCta: { label: 'Faça parte', href: '/join-us' },
  secondaryCta: { label: 'Como posso ajudar?', href: '/contributing' },
} as const;

export type HeroContent = typeof hero;

export const mission = {
  title: 'Missão',
  body: [
    'A PodCodar existe para democratizar o acesso à educação profissionalizante nas áreas de tecnologia. Acreditamos que qualificação e acesso ao conhecimento digital são motores de mudança de vida — e que, no Brasil, essa educação ainda costuma ser elitizada, limitada e cara.',
    'Por isso guiamos e damos acesso a quem deseja se profissionalizar: em comunidade, com escuta e responsabilidade social.',
    'Nosso foco de ensino inclui, entre outras frentes: software (front-end e back-end), infraestrutura, inteligência artificial, dados (incluindo engenharia e ciência de dados) e design (UI e UX).',
  ],
} as const;

export type Activity = {
  title: string;
  description: string;
  icon: 'interview' | 'career' | 'groups' | 'project' | 'cafe' | 'workshop';
};

export const activities: Activity[] = [
  {
    title: 'Entrevistas simuladas',
    description:
      'Pratique processos seletivos com apoio da comunidade e feedback para ganhar confiança antes da entrevista de verdade.',
    icon: 'interview',
  },
  {
    title: 'Mentoria de carreira',
    description:
      'Conversas e orientação para transição, currículo, portfólio e próximos passos — do primeiro estágio à troca de área.',
    icon: 'career',
  },
  {
    title: 'Grupos de estudo',
    description:
      'Turmas e canais no WhatsApp e no Discord para tirar dúvidas, compartilhar materiais e manter o ritmo de estudo coletivo.',
    icon: 'groups',
  },
  {
    title: 'Assistência em projetos',
    description:
      'Mentoria em projetos práticos — da ideia ao repositório — com apoio de quem já passou por desafios parecidos.',
    icon: 'project',
  },
  {
    title: 'Café com Código',
    description:
      'Encontros para trocar experiência, apresentar o que você está construindo e conhecer a comunidade com calma (e café).',
    icon: 'cafe',
  },
  {
    title: 'Workshops',
    description:
      'Oficinas práticas sobre tecnologia, carreira e ferramentas — do básico ao avançado, abertas para toda a comunidade.',
    icon: 'workshop',
  },
] as const;

export type Testimonial = {
  id: number;
  name: string;
  role?: string;
  avatarUrl: string;
  profileUrl: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Giovanna Neves Damasceno',
    avatarUrl: 'https://avatars.githubusercontent.com/u/18710340?v=4',
    profileUrl: 'https://github.com/giovannand',
    quote:
      'A PodCodar juntou minha trajetória em tecnologia com o desejo de trabalhar com pessoas e ajudá-las a se desenvolver. É um projeto com propósito claro — amo fazer parte.',
  },
  {
    id: 2,
    name: 'Gilberto Ferreira Borges Júnior',
    avatarUrl: 'https://avatars.githubusercontent.com/u/57193296?v=4',
    profileUrl: 'https://github.com/borgesgfj',
    quote:
      'Com o apoio da comunidade fiz a transição da pesquisa e do ensino em física para engenharia de software. Hoje contribuir de volta é tão gratificante quanto aprender aqui.',
  },
  {
    id: 3,
    name: 'Filipe Barbosa',
    avatarUrl: 'https://avatars.githubusercontent.com/u/65319425?v=4',
    profileUrl: 'https://github.com/Filipe-barbosa',
    quote:
      'Pensei que programar não era pra mim — entrei na comunidade e, com o tempo, a confiança veio. Hoje sigo construindo carreira com a rede ao lado.',
  },
  {
    id: 4,
    name: 'Guilherme Barbosa',
    avatarUrl: 'https://avatars.githubusercontent.com/u/73261443?v=4',
    profileUrl: 'https://github.com/Guilherme-BS',
    quote:
      'A PodCodar mudou minha perspectiva: novas conversas, novos aprendizados e um lugar onde me sinto em casa na tecnologia.',
  },
] as const;

export type HelpPath = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

export const howToHelp: HelpPath[] = [
  {
    title: 'Doações',
    description:
      'Apoio financeiro de pessoas físicas e patrocínios ajudam a manter a PodCodar sustentável e a ampliar impacto — plataforma de ensino, oficinas e equipe.',
    href: '/contact',
    cta: 'Falar sobre doação',
  },
  {
    title: 'Voluntariado',
    description:
      'Tempo e habilidades: mentoria, facilitação de estudos e eventos, revisão de código, design e comunicação — há espaço para o seu jeito de contribuir.',
    href: '/contributing',
    cta: 'Ver voluntariado',
  },
  {
    title: 'Parcerias',
    description:
      'Empresas e fundos podem apoiar diversidade e educação em tecnologia — inclusive parcerias para contratação de pessoas qualificadas pela comunidade.',
    href: '/contact',
    cta: 'Propor parceria',
  },
] as const;

/** Core values (from the onboarding guide). */
export const coreValues: { title: string; text: string }[] = [
  {
    title: 'Inclusão',
    text: 'Garantir que a educação tecnológica seja acessível a todos, independentemente de origem, renda ou localização. Somos um espaço seguro e acolhedor.',
  },
  {
    title: 'Colaboração',
    text: 'Estudar junto é mais prazeroso e eficiente. Valorizamos o compartilhamento de conhecimento, discussões abertas e o apoio mútuo em projetos e estudos.',
  },
  {
    title: 'Qualidade de ensino',
    text: 'Foco em mentoria e conteúdo que prepare de fato a próxima geração de profissionais digitais para o mercado de trabalho.',
  },
];

export const aboutCommunity = {
  title: 'Cultura e organização',
  lead: 'A comunidade se organiza para multiplicar impacto: núcleo pedagógico, guildas por área e iniciativas práticas dentro de cada uma.',
  points: [
    'Núcleo Pedagógico: centraliza visão, prioridades e alocação de pessoas e recursos para as iniciativas.',
    'Guildas: núcleos por área de interesse ou entrega (projetos, eventos, design e outras frentes).',
    'Iniciativas: programas concretos — mentorias, incubadora, Café com Código, meetups, workshops, Chá com Design e mais.',
  ],
} as const;

export type ProjectItem = {
  name: string;
  description: string;
  href: string;
};

export const projects: ProjectItem[] = [
  {
    name: 'Site e materiais PodCodar',
    description: 'Este site e recursos da comunidade em evolução — contribuições são bem-vindas.',
    href: 'https://github.com/podcodar/webapp',
  },
  {
    name: 'Organização no GitHub',
    description: 'Repositórios abertos da PodCodar — issues e PRs são um ótimo primeiro passo.',
    href: 'https://github.com/podcodar',
  },
] as const;

export const eventsBlock = {
  title: 'Eventos',
  body: 'Café com Código, meetups e workshops são alguns dos formatos em que a comunidade se encontra ao vivo (muitas vezes no Google Meet). Novidades e convites circulam nos grupos e no Discord.',
  externalLabel: 'Ver organização no GitHub',
  externalHref: 'https://github.com/podcodar',
} as const;

type ChannelColor = 'emerald' | 'violet' | 'blue';

export type CommunicationChannel = {
  channel: string;
  description: string;
  icon: string;
  color: ChannelColor;
};

/** Communication channels (onboarding guide). */
export const communicationChannels: CommunicationChannel[] = [
  {
    channel: 'WhatsApp',
    description:
      'Comunicação do dia a dia: avisos rápidos, interação social e coordenação com a turma.',
    icon: 'lucide:message-circle',
    color: 'emerald',
  },
  {
    channel: 'Discord',
    description:
      'Grupos de estudo, canais técnicos, mentorias e discussões — é o “quartel-general” assíncrono da PodCodar.',
    icon: 'simple-icons:discord',
    color: 'violet',
  },
  {
    channel: 'Google Meet',
    description: 'Reuniões do núcleo pedagógico, workshops e encontros ao vivo com a comunidade.',
    icon: 'lucide:video',
    color: 'blue',
  },
];
