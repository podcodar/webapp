export const defaultLang = 'pt-br' as const;

export const ui = {
  'pt-br': {
    'nav.home': 'Início',
    'nav.blog': 'Blog',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.contributing': 'Como posso ajudar?',
    'nav.join_us': 'Faça parte!',
    'nav.transparency': 'Transparência',
    'footer.copyright': 'Todos os direitos reservados.',
    // Transparency page
    'transparency.title': 'Transparência',
    'transparency.subtitle': 'Compromisso com a transparência e prestação de contas',
    'transparency.intro':
      'A PodCodar acredita que a transparência é fundamental para construir confiança com nossa comunidade, doadores e parceiros. Estamos comprometidos em prestar contas de nossas atividades, finanças e governança.',
    'transparency.documents.title': 'Documentos',
    'transparency.documents.subtitle': 'Acesse nossos documentos institucionais e financeiros.',
    'transparency.board.title': 'Conselho Administrativo',
    'transparency.board.subtitle': 'Conheça a diretoria eleita para o biênio 2026-2028.',
    'transparency.metrics.title': 'Impacto e Resultados',
    'transparency.metrics.subtitle': 'Números que refletem o trabalho da comunidade.',
    'transparency.contact.title': 'Fale Conosco',
    'transparency.contact.text':
      'Tem perguntas sobre nossas finanças ou governança? Entre em contato:',
    'transparency.lastUpdated': 'Última atualização',
    'transparency.download': 'Baixar documento',
    'transparency.view': 'Ver documento',
    'transparency.category.institucional': 'Institucional',
    'transparency.category.financeiro': 'Financeiro',
    'transparency.category.fiscal': 'Fiscal',
    'transparency.cnpj': 'CNPJ',
  },
} as const;

export type Lang = keyof typeof ui;
