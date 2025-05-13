import alfredConfigJson from './whiteLabels/alfred.config.json';
import johnGaltConfigJson from './whiteLabels/johngalt.config.json';
import strategyMarsConfigJson from './whiteLabels/strategymars.config.json';

export interface WhiteLabelConfig {
  id: string;
  name: string;
  shortName: string;
  supportEmail: string;
  supportWhatsapp: string;
  salesWhatsapp: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundSecondary: string;
    text: string;
    primaryHover: string;
    secondaryHover: string;
    success: string;
    error: string;
    warning: string;
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
    main: string;
    mainDark: string;
    mainLight: string;
    type: string;
    typeDark: string;
    typeLight: string;
    alternative: string;
    icon: string;
    footer?: string;
    levelIcon: string;
    applyLevelIconFilter?: boolean;
  };
  background: {
    hero: string;
    opacity?: number;
  };
  favicon: string;
  userLevels: {
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
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
  localePrefix: string;
  metaTags: {
    title: string;
    description: string;
    ogImage: string;
  };
}

const johnGaltConfig: WhiteLabelConfig = johnGaltConfigJson as WhiteLabelConfig;
const alfredConfig: WhiteLabelConfig = alfredConfigJson as WhiteLabelConfig;
const strategyMarsConfig: WhiteLabelConfig =
  strategyMarsConfigJson as WhiteLabelConfig;

export const domainConfigs: Record<string, WhiteLabelConfig> = {
  'johngaltp2p.com': johnGaltConfig,
  'alfredp2p.com': alfredConfig,
  'strategymars.com': strategyMarsConfig,
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

  return johnGaltConfig;
}

export function getCurrentConfig(): WhiteLabelConfig {
  if (typeof window === 'undefined') return johnGaltConfig;
  const domain = window.location.hostname;
  return getConfigByDomain(domain);
}
