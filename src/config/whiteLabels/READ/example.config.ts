export const exampleConfig = {
  // Identificadores básicos
  id: 'novosite', // ID único da marca (usado em URLs e nomes de arquivos)
  name: 'Nome da Marca', // Nome completo da marca
  shortName: 'NM', // Abreviação (2-3 letras)

  // Informações de contato
  supportEmail: 'suporte@seudominio.com', // Email de suporte
  supportWhatsapp: '+5511999999999', // WhatsApp para suporte/atendimento
  salesWhatsapp: '+5511988888888', // WhatsApp para vendas e conversões

  // Esquema de cores (todas as cores em hexadecimal)
  colors: {
    primary: '#007bff', // Cor principal da marca
    secondary: '#6c757d', // Cor secundária
    accent: '#ffc107', // Cor de destaque para elementos importantes
    background: '#ffffff', // Cor de fundo principal
    backgroundSecondary: '#f8f9fa', // Cor de fundo para áreas secundárias
    text: '#212529', // Cor principal do texto
    primaryHover: '#0069d9', // Cor quando hover sobre elementos primários
    secondaryHover: '#5a6268', // Cor quando hover sobre elementos secundários
    success: '#28a745', // Cor para mensagens de sucesso
    error: '#dc3545', // Cor para mensagens de erro
    warning: '#ffc107', // Cor para mensagens de alerta
  },

  // Links para redes sociais (deixe em branco se não tiver)
  socialMedia: {
    instagram: 'https://www.instagram.com/suamarca/',
    twitter: 'https://x.com/suamarca',
    facebook: 'https://facebook.com/suamarca',
    telegram: 'https://t.me/suamarca',
    linkedin: 'https://linkedin.com/company/suamarca',
  },

  // Fontes do site
  fonts: {
    main: 'Roboto', // Fonte principal (use nome do Google Fonts)
    headings: 'Montserrat', // Fonte para títulos (use nome do Google Fonts)
  },

  // Configurações de logo
  logo: {
    main: '/src/view/assets/seusite/logo/logo.png', // Logo principal
    mainDark: '/src/view/assets/seusite/logo/logo_dark.png', // Versão escura
    mainLight: '/src/view/assets/seusite/logo/logo_light.png', // Versão clara
    type: '/src/view/assets/seusite/logo/logo_type.svg', // Logo com texto
    typeDark: '/src/view/assets/seusite/logo/logo_type_dark.svg', // Logo com texto (dark)
    typeLight: '/src/view/assets/seusite/logo/logo_type_light.svg', // Logo com texto (light)
    alternative: '/src/view/assets/seusite/logo/logo_alt.png', // Logo alternativa
    icon: '/src/view/assets/seusite/logo/logo.png', // Ícone (formato quadrado)
    footer: '/src/view/assets/seusite/logo/logo_footer.svg', // Logo do rodapé
    levelIcon: '/src/view/assets/seusite/logo/level_icon.png', // Ícone para níveis de usuário
    applyLevelIconFilter: true, // Se deve aplicar filtros CSS ao ícone de nível
  },

  // Configurações de fundo
  background: {
    hero: '/seusite/bg-hero.jpg', // Imagem de fundo principal
    opacity: 90, // Opacidade do fundo (0-100)
  },

  // Caminho para o favicon
  favicon: '/seusite/favicon-96x96.png',

  // Configurações de níveis de usuário
  userLevels: {
    // Nomes dos níveis (0 a 5)
    level0: 'Iniciante',
    level1: 'Básico',
    level2: 'Intermediário',
    level3: 'Avançado',
    level4: 'Expert',
    level5: 'Master',

    // Cores para cada nível (usado em badges e indicadores)
    colors: {
      level0: { primary: '#6c757d', secondary: '#495057' },
      level1: { primary: '#17a2b8', secondary: '#138496' },
      level2: { primary: '#28a745', secondary: '#218838' },
      level3: { primary: '#ffc107', secondary: '#e0a800' },
      level4: { primary: '#fd7e14', secondary: '#e36209' },
      level5: { primary: '#dc3545', secondary: '#c82333' },
    },

    // Emojis/ícones para cada nível
    icons: {
      level0: '🌱',
      level1: '🌿',
      level2: '🌴',
      level3: '🚀',
      level4: '⭐',
      level5: '🏆',
    },
  },

  // Prefixo para arquivos de tradução
  localePrefix: 'seusite',

  // Meta tags para SEO
  metaTags: {
    title: 'Seu Site | Descrição Curta',
    description: 'Descrição completa do seu site para SEO (150-160 caracteres)',
    ogImage: '/seusite/og-image.jpg', // Imagem para compartilhamento em redes sociais
  },
};
