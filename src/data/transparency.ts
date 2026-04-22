/** Static data for the Transparency page */

export const CNPJ = '53.979.776/0001-61';

export const CONTACT_EMAIL = 'contato@podcodar.org';

export const BOARD_MEMBERS = [
  { name: 'Marco Antônio de Souza Júnior', role: 'Presidente' },
  { name: 'Pedro Henrique Ramos Costa', role: 'Vice-Presidente' },
  { name: 'Marina Andrade Fonseca', role: 'Tesoureiro' },
  { name: 'Pedro Frattezi Silva', role: 'Secretário' },
  { name: 'Filipe Barbosa Silva', role: 'Conselheiro Fiscal' },
  { name: 'Joel Morais Leal', role: 'Conselheiro Fiscal' },
  { name: 'Luis Arthur Bighetti Valini', role: 'Conselheiro Fiscal' },
] as const;

export const METRICS = [
  { value: '300+', label: 'membros' },
  { value: '30+', label: 'mentorados' },
  { value: '16+', label: 'colocados em empregos' },
  { value: '2', label: 'colocados em universidades federais' },
] as const;

export type BoardMember = (typeof BOARD_MEMBERS)[number];
export type Metric = (typeof METRICS)[number];
