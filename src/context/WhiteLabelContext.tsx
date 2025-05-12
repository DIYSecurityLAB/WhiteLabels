import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { WhiteLabelConfig, getCurrentConfig } from '../config/whiteLabels';

interface WhiteLabelContextType {
  config: WhiteLabelConfig;
  isLoaded: boolean;
  getLevelName: (level: number) => string;
  getLogoByTheme: (
    theme: 'light' | 'dark' | 'default',
    type?: 'main' | 'type' | 'alternative' | 'icon',
  ) => string;
  getLevelIcon: (level: number) => string;
  getLevelColors: (level: number) => { primary: string; secondary: string };
  loadHeaderFont: () => void; // Nova função para carregar a fonte do cabeçalho dinamicamente
}

const WhiteLabelContext = createContext<WhiteLabelContextType>({
  config: getCurrentConfig(),
  isLoaded: false,
  getLevelName: () => '',
  getLogoByTheme: () => '',
  getLevelIcon: () => '',
  getLevelColors: () => ({ primary: '', secondary: '' }),
  loadHeaderFont: () => {},
});

export const useWhiteLabel = () => useContext(WhiteLabelContext);

interface WhiteLabelProviderProps {
  children: ReactNode;
}

export const WhiteLabelProvider: React.FC<WhiteLabelProviderProps> = ({
  children,
}) => {
  const [config, setConfig] = useState<WhiteLabelConfig>(getCurrentConfig());
  const [isLoaded, setIsLoaded] = useState(false);

  // Função para obter o nome do nível com base no número do nível
  const getLevelName = (level: number): string => {
    switch (level) {
      case 0:
        return config.userLevels.level0;
      case 1:
        return config.userLevels.level1;
      case 2:
        return config.userLevels.level2;
      case 3:
        return config.userLevels.level3;
      case 4:
        return config.userLevels.level4;
      case 5:
        return config.userLevels.level5;
      default:
        return config.userLevels.level0;
    }
  };

  // Função para obter o ícone do nível com base no número do nível
  const getLevelIcon = (level: number): string => {
    const key = `level${level}` as keyof typeof config.userLevels.icons;
    return config.userLevels.icons[key];
  };

  // Função para obter as cores do nível com base no número do nível
  const getLevelColors = (
    level: number,
  ): { primary: string; secondary: string } => {
    const key = `level${level}` as keyof typeof config.userLevels.colors;
    return config.userLevels.colors[key];
  };

  // Função para obter o logo apropriado com base no tema e tipo
  const getLogoByTheme = (
    theme: 'light' | 'dark' | 'default' = 'default',
    type: 'main' | 'type' | 'alternative' | 'icon' = 'main',
  ): string => {
    if (type === 'icon') return config.logo.icon;

    if (type === 'alternative') return config.logo.alternative;

    if (type === 'type') {
      if (theme === 'light') return config.logo.typeLight;
      if (theme === 'dark') return config.logo.typeDark;
      return config.logo.type;
    }

    // Default is main logo
    if (theme === 'light') return config.logo.mainLight;
    if (theme === 'dark') return config.logo.mainDark;
    return config.logo.main;
  };

  const loadHeaderFont = () => {
    const headerFont = config.fonts.headings;
    const mainFont = config.fonts.main;

    // Função auxiliar para carregar uma fonte específica
    const loadFont = (fontName: string) => {
      // Normaliza o nome da fonte para a URL do Google Fonts
      const normalizedFontName = fontName.replace(/\s+/g, '+');

      // Verifica se a fonte já está carregada
      const existingLinks = Array.from(
        document.querySelectorAll('link[rel="stylesheet"]'),
      ) as HTMLLinkElement[];
      const fontLoaded = existingLinks.some(
        (link) =>
          link.href.includes(normalizedFontName) ||
          link.dataset.fontName === fontName,
      );

      if (!fontLoaded) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${normalizedFontName}:wght@300;400;500;600;700;800&display=swap`;
        link.dataset.fontName = fontName; // Marca o link com o nome da fonte
        document.head.appendChild(link);

        console.log(`Fonte ${fontName} carregada dinamicamente`);
      }
    };

    // Carrega as fontes específicas
    loadFont(headerFont);
    loadFont(mainFont);

    // Configura as variáveis CSS para as fontes
    document.documentElement.style.setProperty(
      '--font-main',
      `'${mainFont}', sans-serif`,
    );
    document.documentElement.style.setProperty(
      '--font-headings',
      `'${headerFont}', sans-serif`,
    );

    // Força a aplicação das fontes em elementos específicos
    document.querySelectorAll('.heading-font').forEach((el) => {
      (el as HTMLElement).style.fontFamily = `'${headerFont}', sans-serif`;
    });
  };

  useEffect(() => {
    // Ao montar o componente, obter a configuração com base no domínio
    const brandConfig = getCurrentConfig();
    setConfig(brandConfig);

    // Carregar fontes globais
    loadHeaderFont();

    // Aplicar cores globais ao CSS
    document.documentElement.style.setProperty(
      '--color-primary',
      brandConfig.colors.primary,
    );
    document.documentElement.style.setProperty(
      '--color-secondary',
      brandConfig.colors.secondary,
    );
    document.documentElement.style.setProperty(
      '--color-accent',
      brandConfig.colors.accent,
    );
    document.documentElement.style.setProperty(
      '--color-bg',
      brandConfig.colors.background,
    );
    document.documentElement.style.setProperty(
      '--color-bg-secondary',
      brandConfig.colors.backgroundSecondary,
    );
    document.documentElement.style.setProperty(
      '--color-text',
      brandConfig.colors.text,
    );
    document.documentElement.style.setProperty(
      '--color-primary-hover',
      brandConfig.colors.primaryHover,
    );
    document.documentElement.style.setProperty(
      '--color-secondary-hover',
      brandConfig.colors.secondaryHover,
    );
    document.documentElement.style.setProperty(
      '--color-success',
      brandConfig.colors.success,
    );
    document.documentElement.style.setProperty(
      '--color-error',
      brandConfig.colors.error,
    );
    document.documentElement.style.setProperty(
      '--color-warning',
      brandConfig.colors.warning,
    );

    // Aplicar fontes novamente sempre que a configuração mudar
    document.documentElement.style.setProperty(
      '--font-main',
      `'${brandConfig.fonts.main}', sans-serif`,
    );
    document.documentElement.style.setProperty(
      '--font-headings',
      `'${brandConfig.fonts.headings}', sans-serif`,
    );

    // Aplicar background
    document.documentElement.style.setProperty(
      '--bg-hero',
      brandConfig.background.hero,
    );
    document.documentElement.style.setProperty(
      '--bg-opacity',
      (brandConfig.background.opacity || 90) + '%',
    );

    // Carregar as fontes especificadas
    if (brandConfig.fonts.main !== 'Lexend') {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${brandConfig.fonts.main.replace(' ', '+')}:wght@300;400;500;600;700;800&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    if (
      brandConfig.fonts.headings !== 'Orbitron' &&
      brandConfig.fonts.headings !== brandConfig.fonts.main
    ) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${brandConfig.fonts.headings.replace(' ', '+')}:wght@300;400;500;600;700;800&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Atualizar metadados
    document.title = brandConfig.metaTags.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', brandConfig.metaTags.description);
    }

    // Atualizar Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');

    if (ogTitle) ogTitle.setAttribute('content', brandConfig.metaTags.title);
    if (ogDesc)
      ogDesc.setAttribute('content', brandConfig.metaTags.description);
    if (ogImage) ogImage.setAttribute('content', brandConfig.metaTags.ogImage);

    // Atualizar favicon
    const favicon = document.querySelector(
      'link[rel="icon"][type="image/png"]',
    );
    if (favicon) {
      favicon.setAttribute('href', brandConfig.favicon);
    }

    setIsLoaded(true);
  }, []);

  // Atualiza a configuração quando o domínio muda (útil para desenvolvimento)
  useEffect(() => {
    const handleDomainChange = () => {
      const newConfig = getCurrentConfig();
      if (newConfig.id !== config.id) {
        setConfig(newConfig);
        // Recarregar fontes quando a marca mudar
        setTimeout(() => loadHeaderFont(), 0);
      }
    };

    // Verifica se houve mudança de domínio a cada 2 segundos (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(handleDomainChange, 2000);
      return () => clearInterval(interval);
    }
  }, [config.id]);

  return (
    <WhiteLabelContext.Provider
      value={{
        config,
        isLoaded,
        getLevelName,
        getLogoByTheme,
        getLevelIcon,
        getLevelColors,
        loadHeaderFont,
      }}
    >
      {children}
    </WhiteLabelContext.Provider>
  );
};
