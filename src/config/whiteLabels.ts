export interface WhiteLabelConfig {
  id: string;
  name: string;
  shortName: string;
  supportEmail: string;
  supportPhone: string;
  supportWhatsapp: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundSecondary: string; // Nova cor para fundos secundários e modais
    text: string;
    primaryHover: string; // Cor para hover em botões principais
    secondaryHover: string; // Cor para hover em botões secundários
    success: string; // Cor de sucesso
    error: string; // Cor de erro
    warning: string; // Cor de alerta
  };
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook?: string;
    telegram?: string;
    linkedin?: string;
  };
  fonts: {
    main: string;
    headings: string;
  };
  logo: {
    main: string; // Logo principal
    mainDark: string; // Versão dark da logo principal
    mainLight: string; // Versão light da logo principal
    type: string; // Logotipo (versão com texto)
    typeDark: string; // Versão dark do logotipo
    typeLight: string; // Versão light do logotipo
    alternative: string; // Logo alternativa
    icon: string; // Ícone/favicon
    footer?: string; // Logo do rodapé
    levelIcon: string; // Ícone exibido ao lado do componente de nível (imagem)
    applyLevelIconFilter?: boolean; // Controla se o filtro brightness/invert deve ser aplicado ao ícone de nível
  };
  background: {
    hero: string; // Imagem de fundo principal
    opacity?: number; // Opacidade do background (0-100)
  };
  favicon: string;
  userLevels: {
    level0: string; // Nome do nível 0 (Ex: "Madeira" para John Galt, "Bronze" para outros)
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
    // Cores e ícones para cada nível
    colors: {
      level0: { primary: string; secondary: string };
      level1: { primary: string; secondary: string };
      level2: { primary: string; secondary: string };
      level3: { primary: string; secondary: string };
      level4: { primary: string; secondary: string };
      level5: { primary: string; secondary: string };
    };
    icons: {
      level0: string;
      level1: string;
      level2: string;
      level3: string;
      level4: string;
      level5: string;
    };
  };
  localePrefix: string; // Prefixo para os arquivos de localização (Ex: "johngalt", "alfred")
  metaTags: {
    title: string;
    description: string;
    ogImage: string;
  };
}

// Configuração padrão (John Galt)
const johnGaltConfig: WhiteLabelConfig = {
  id: 'johngalt',
  name: 'John Galt',
  shortName: 'JG',
  supportEmail: 'support@johngaltp2p.com',
  supportPhone: '+5511911872097',
  supportWhatsapp: '+5511911872097',
  colors: {
    primary: '#ff007a',
    secondary: '#000A13',
    accent: '#F49300',
    background: '#000000',
    backgroundSecondary: '#1a1d2b',
    text: '#ffffff',
    primaryHover: '#c40963',
    secondaryHover: '#001a2e',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/alfredp2p/',
    twitter: 'https://x.com/alfredp2p',
  },
  fonts: {
    main: 'Lexend',
    headings: 'Orbitron',
  },
  logo: {
    main: '/src/view/assets/johngalt/logo/logo.png',
    mainDark: '/src/view/assets/johngalt/logo/logo_dark.png',
    mainLight: '/src/view/assets/johngalt/logo/logo_light.png',
    type: '/src/view/assets/johngalt/logo/logo_type.svg',
    typeDark: '/src/view/assets/johngalt/logo/logo_type_dark.svg',
    typeLight: '/src/view/assets/johngalt/logo/logo_type_light.svg',
    alternative: '/src/view/johngalt/assets/logo/logo_alt.png',
    icon: '/src/view/assets/johngalt/logo/logo.png',
    footer: '/src/view/assets/johngalt/logo/logo_footer.svg',
    levelIcon: '/src/view/assets/johngalt/logo/logo.png',
    applyLevelIconFilter: true, // Aplicar filtro para JohnGalt
  },
  background: {
    hero: '/johngalt/bg-hero.png',
    opacity: 90,
  },
  favicon: '/johngalt/favicon-96x96.png',
  userLevels: {
    level0: 'Madeira',
    level1: 'Bronze',
    level2: 'Prata',
    level3: 'Ouro',
    level4: 'Diamante',
    level5: 'Platina',
    colors: {
      level0: { primary: '#718096', secondary: '#2D3748' },
      level1: { primary: '#b45309', secondary: '#92400E' },
      level2: { primary: '#9ca3af', secondary: '#6B7280' },
      level3: { primary: '#eab308', secondary: '#ca8a04' },
      level4: { primary: '#3b82f6', secondary: '#2563eb' },
      level5: { primary: '#8b5cf6', secondary: '#7c3aed' },
    },
    icons: {
      level0: '🪵',
      level1: '🥉',
      level2: '🥈',
      level3: '🥇',
      level4: '💎',
      level5: '🏆',
    },
  },
  localePrefix: 'johngalt',
  metaTags: {
    title: 'John Galt | P2P',
    description:
      'Compre Bitcoin de forma privada e segura com transações P2P sem KYC.',
    ogImage: '/johngalt/og-image.jpg',
  },
};

// Exemplo de uma segunda marca (Alfred)
const alfredConfig: WhiteLabelConfig = {
  id: 'alfred',
  name: 'Alfred P2P',
  shortName: 'AP',
  supportEmail: 'support@alfredp2p.com',
  supportPhone: '+5511911872097',
  supportWhatsapp: '+5511911872097',
  colors: {
    primary: '#F49300',
    secondary: '#000E16',
    accent: '#0071BC',
    background: '#000000',
    backgroundSecondary: '#0d131f',
    text: '#ffffff',
    primaryHover: '#d47e00',
    secondaryHover: '#001a29',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/alfredp2p/',
    twitter: 'https://x.com/alfredp2p',
    facebook: 'https://facebook.com/alfredp2p',
    telegram: 'https://t.me/alfredp2p',
    linkedin: 'https://linkedin.com/company/alfredp2p',
  },
  fonts: {
    main: 'Poppins',
    headings: 'Jersey 10',
  },
  logo: {
    main: '/src/view/assets/alfred/logo/logo.png',
    mainDark: '/src/view/assets/alfred/logo/logo_dark.png',
    mainLight: '/src/view/assets/alfred/logo/logo_light.png',
    type: '/src/view/assets/alfred/logo/logo_type.svg',
    typeDark: '/src/view/assets/alfred/logo/logo_type_dark.svg',
    typeLight: '/src/view/assets/alfred/logo/logo_type_light.svg',
    alternative: '/src/view/assets/alfred/logo/logo_alt.png',
    icon: '/src/view/assets/alfred/logo/logo.png',
    footer: '/src/view/assets/alfred/logo/logo_footer.svg',
    levelIcon: '/src/view/assets/alfred/logo/level_icon.png', // Ícone do nível para Alfred
    applyLevelIconFilter: true, // Aplicar filtro para Alfred
  },
  background: {
    hero: '/alfred/bg-hero.png',
    opacity: 90,
  },
  favicon: '/alfred/favicon-96x96.png',
  userLevels: {
    level0: 'Iniciante',
    level1: 'Básico',
    level2: 'Intermediário',
    level3: 'Avançado',
    level4: 'Expert',
    level5: 'Master',
    colors: {
      level0: { primary: '#9CA3AF', secondary: '#4B5563' },
      level1: { primary: '#F97316', secondary: '#EA580C' },
      level2: { primary: '#0EA5E9', secondary: '#0284C7' },
      level3: { primary: '#22C55E', secondary: '#16A34A' },
      level4: { primary: '#8B5CF6', secondary: '#7C3AED' },
      level5: { primary: '#EC4899', secondary: '#DB2777' },
    },
    icons: {
      level0: '🌱',
      level1: '🌿',
      level2: '🌴',
      level3: '🚀',
      level4: '⭐',
      level5: '🔮',
    },
  },
  localePrefix: 'alfred',
  metaTags: {
    title: 'Alfred P2P | Bitcoin P2P',
    description:
      'Compre e venda Bitcoin de forma privada e segura. Transações P2P sem KYC.',
    ogImage: '/alfred/og-image.jpg',
  },
};

// Configuração para Strategy Mars
const strategyMarsConfig: WhiteLabelConfig = {
  id: 'strategymars',
  name: 'Strategy Mars',
  shortName: 'SM',
  supportEmail: 'support@strategymars.com',
  supportPhone: '+5511911872097',
  supportWhatsapp: '+5511911872097',
  colors: {
    primary: '#D84315', // Laranja escuro (inspirado na superfície de Marte)
    secondary: '#1A1A1A', // Preto escuro
    accent: '#FF7043', // Laranja mais claro para destaque
    background: '#0A0A0A', // Fundo quase preto
    backgroundSecondary: '#151515',
    text: '#F5F5F5', // Texto quase branco
    primaryHover: '#BF360C', // Laranja mais escuro para hover
    secondaryHover: '#2D2D2D', // Cinza escuro para hover
    success: '#43A047',
    error: '#E53935',
    warning: '#FFB300',
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/strategymars/',
    twitter: 'https://x.com/strategymars',
    facebook: 'https://facebook.com/strategymars',
    telegram: 'https://t.me/strategymars',
    linkedin: 'https://linkedin.com/company/strategymars',
  },
  fonts: {
    main: 'Lexend Deca',
    headings: 'Josefin Sans',
  },
  logo: {
    main: '/src/view/assets/strategymars/logo/logo.png',
    mainDark: '/src/view/assets/strategymars/logo/logo_dark.png',
    mainLight: '/src/view/assets/strategymars/logo/logo_light.png',
    type: '/src/view/assets/strategymars/logo/logo_type.svg',
    typeDark: '/src/view/assets/strategymars/logo/logo_type_dark.svg',
    typeLight: '/src/view/assets/strategymars/logo/logo_type_light.svg',
    alternative: '/src/view/assets/strategymars/logo/logo_alt.png',
    icon: '/src/view/assets/strategymars/logo/logo.png',
    footer: '/src/view/assets/strategymars/logo/logo_footer.svg',
    levelIcon: '/src/view/assets/strategymars/logo/logo.png',
    applyLevelIconFilter: false,
  },
  background: {
    hero: '/strategymars/bg-hero.jpg',
    opacity: 85,
  },
  favicon: '/strategymars/favicon-96x96.png',
  userLevels: {
    level0: 'Explorador',
    level1: 'Pioneiro',
    level2: 'Colono',
    level3: 'Comandante',
    level4: 'Almirante',
    level5: 'Imperador',
    colors: {
      level0: { primary: '#757575', secondary: '#424242' },
      level1: { primary: '#D84315', secondary: '#BF360C' },
      level2: { primary: '#90A4AE', secondary: '#607D8B' },
      level3: { primary: '#FFB300', secondary: '#FF8F00' },
      level4: { primary: '#5C6BC0', secondary: '#3949AB' },
      level5: { primary: '#7E57C2', secondary: '#5E35B1' },
    },
    icons: {
      level0: '🚀',
      level1: '🔭',
      level2: '🛰️',
      level3: '🪐',
      level4: '✨',
      level5: '👑',
    },
  },
  localePrefix: 'strategymars',
  metaTags: {
    title: 'Strategy Mars | Bitcoin P2P',
    description:
      'Compre e venda Bitcoin como um verdadeiro explorador. Transações P2P sem KYC, com privacidade e segurança máximas.',
    ogImage: '/strategymars/og-image.jpg',
  },
};

// Mapeando os domínios para suas respectivas configurações
export const domainConfigs: Record<string, WhiteLabelConfig> = {
  'johngaltp2p.com': johnGaltConfig,
  'alfredp2p.com': alfredConfig,
  'strategymars.com': strategyMarsConfig,

  // Para ambiente de desenvolvimento local (localhost), usa o padrão
  localhost: johnGaltConfig,
  '127.0.0.1': johnGaltConfig,
};

export function getConfigByDomain(domain: string): WhiteLabelConfig {
  const cleanDomain = domain.replace(/^www\./, '');

  const exactConfig = domainConfigs[cleanDomain];
  if (exactConfig) return exactConfig;

  for (const [configDomain, config] of Object.entries(domainConfigs)) {
    if (
      cleanDomain.includes(configDomain) ||
      configDomain.includes(cleanDomain)
    ) {
      return config;
    }
  }

  // Se não encontrar correspondência, retorna configuração padrão
  return alfredConfig; // Usando Alfred como configuração padrão
}

// Função para obter a configuração com base na URL atual
export function getCurrentConfig(): WhiteLabelConfig {
  if (typeof window === 'undefined') return johnGaltConfig;

  const domain = window.location.hostname;
  return getConfigByDomain(domain);
}
