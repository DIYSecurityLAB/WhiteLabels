import { useWhiteLabel } from '@/context/WhiteLabelContext';
import { useEffect } from 'react';

export const DynamicMetaTags = () => {
  const { config } = useWhiteLabel();

  useEffect(() => {
    // Atualizar título da página
    document.title = config.metaTags.title;

    // Atualizar descrição e meta tags
    updateMetaTag('description', config.metaTags.description);
    updateMetaTag('title', config.metaTags.title);

    // Atualizar Open Graph
    updateMetaTag('og:title', config.metaTags.title, 'property');
    updateMetaTag('og:description', config.metaTags.description, 'property');
    updateMetaTag('og:image', `/${config.id}/og-image.jpg`, 'property');

    // Atualizar Twitter Cards
    updateMetaTag('twitter:title', config.metaTags.title, 'property');
    updateMetaTag(
      'twitter:description',
      config.metaTags.description,
      'property',
    );
    updateMetaTag('twitter:image', `/${config.id}/og-image.jpg`, 'property');

    // Atualizar favicon e app icons
    updateLink('icon', `/${config.id}/favicon-96x96.png`);
    updateLink('icon', `/${config.id}/favicon-16x16.png`, 'image/png', '16x16');
    updateLink('icon', `/${config.id}/favicon-32x32.png`, 'image/png', '32x32');
    updateLink('shortcut icon', `/${config.id}/favicon.ico`);
    updateLink('apple-touch-icon', `/${config.id}/apple-touch-icon.png`);
    updateLink('manifest', `/${config.id}/site.webmanifest`);

    // Atualizar tema e cores
    updateMetaTag('theme-color', config.colors.primary);
    updateMetaTag('msapplication-TileColor', config.colors.primary);

    // Atualizar título da aplicação móvel
    updateMetaTag('apple-mobile-web-app-title', config.name);

    // Definir variáveis CSS globais
    updateCSSVariables();
  }, [config]);

  const updateMetaTag = (
    name: string,
    content: string,
    attributeName = 'name',
  ) => {
    let element = document.querySelector(`meta[${attributeName}="${name}"]`);

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, name);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  };

  const updateLink = (
    rel: string,
    href: string,
    type?: string,
    sizes?: string,
  ) => {
    const links = document.querySelectorAll(
      `link[rel="${rel}"]`,
    ) as NodeListOf<HTMLLinkElement>;

    if (links.length === 0) {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (type) link.type = type;
      if (sizes) link.sizes = sizes;
      document.head.appendChild(link);
    } else {
      links.forEach((link) => {
        link.href = href;
        if (type) link.type = type;
        if (sizes) link.sizes = sizes;
      });
    }
  };

  const updateCSSVariables = () => {
    const root = document.documentElement;

    // Cores
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);
    root.style.setProperty('--color-bg', config.colors.background);
    root.style.setProperty(
      '--color-bg-secondary',
      config.colors.backgroundSecondary,
    );
    root.style.setProperty('--color-text', config.colors.text);
    root.style.setProperty('--color-primary-hover', config.colors.primaryHover);
    root.style.setProperty(
      '--color-secondary-hover',
      config.colors.secondaryHover,
    );
    root.style.setProperty('--color-success', config.colors.success);
    root.style.setProperty('--color-error', config.colors.error);
    root.style.setProperty('--color-warning', config.colors.warning);

    // Fontes
    root.style.setProperty('--font-main', config.fonts.main);
    root.style.setProperty('--font-headings', config.fonts.headings);

    // Carrega as fontes definidas na configuração se ainda não estiverem carregadas
    loadFonts();
  };

  const loadFonts = () => {
    const mainFont = config.fonts.main;
    const headingsFont = config.fonts.headings;

    // Verifica se as fontes já estão sendo carregadas
    const existingLinks = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]'),
    ) as HTMLLinkElement[];
    const mainFontLoaded = existingLinks.some((link) =>
      link.href.includes(mainFont),
    );
    const headingsFontLoaded = existingLinks.some((link) =>
      link.href.includes(headingsFont),
    );

    // Carrega a fonte principal se necessário
    if (!mainFontLoaded && mainFont !== 'Lexend') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${mainFont}:wght@300;400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }

    // Carrega a fonte de títulos se necessário
    if (!headingsFontLoaded && headingsFont !== 'Orbitron') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${headingsFont}:wght@300;400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  };

  return null;
};
