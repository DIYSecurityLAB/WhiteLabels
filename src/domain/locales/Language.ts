import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getCurrentConfig } from '../../config/whiteLabels';
import translationEN from './en/translation.json';
import translationES from './es/translation.json';
import translationPT from './pt/translation.json';

// Importando traduções específicas dos white labels - será feito dinamicamente

export const LanguageTexts = {
  header: {
    links: [
      'header.links.0',
      'header.links.1',
      'header.links.2',
      'header.links.3',
      'header.links.4',
      'header.links.5',
    ],
    contact_sales: 'header.contact_sales',
  },
};

export enum AcceptedLanguages {
  pt = 'pt',
  en = 'en',
  es = 'es',
}

const savedLanguage = localStorage.getItem('language') || AcceptedLanguages.pt;

// Função para carregar as traduções específicas do white label
const loadWhiteLabelTranslations = async (
  whiteLabel: string,
  lang: AcceptedLanguages,
) => {
  try {
    const module = await import(
      `./whiteLabels/${whiteLabel}/${lang}/translation.json`
    );
    return module.default;
  } catch {
    console.warn(
      `Traduções específicas para ${whiteLabel} em ${lang} não encontradas. Usando traduções padrão.`,
    );
    return null;
  }
};

// Inicializar i18next com as traduções padrão
i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: translationPT },
    en: { translation: translationEN },
    es: { translation: translationES },
  },
  lng: savedLanguage,
  fallbackLng: AcceptedLanguages.pt,
  interpolation: {
    escapeValue: false,
  },
});

export function useLanguage() {
  const { lang } = useParams<{ lang: AcceptedLanguages }>();
  const [isWhiteLabelLoaded, setIsWhiteLabelLoaded] = useState(false);

  useEffect(() => {
    // Função para carregar as traduções do white label atual
    const loadCurrentWhiteLabelTranslations = async () => {
      const config = getCurrentConfig();
      const whiteLabel = config.localePrefix;

      // Carregar traduções para todos os idiomas suportados
      const translations: Record<string, { translation: object } | null> = {};
      for (const language of Object.values(AcceptedLanguages)) {
        const whiteLabelTranslation = await loadWhiteLabelTranslations(
          whiteLabel,
          language,
        );
        if (whiteLabelTranslation) {
          translations[language] = { translation: whiteLabelTranslation };
        }
      }

      // Adicionar as traduções ao i18next
      if (Object.keys(translations).length > 0) {
        Object.entries(translations).forEach(([language, resources]) => {
          // Mesclar com as traduções padrão, dando prioridade às específicas do white label
          if (resources && resources.translation) {
            const currentResources =
              i18n.getResourceBundle(language, 'translation') || {};
            const mergedResources = {
              ...currentResources,
              ...resources.translation,
            };
            i18n.addResourceBundle(
              language,
              'translation',
              mergedResources,
              true,
              true,
            );
          }
        });
      }

      setIsWhiteLabelLoaded(true);
    };

    loadCurrentWhiteLabelTranslations();
  }, []);

  useEffect(() => {
    if (lang && isWhiteLabelLoaded) {
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
    }
  }, [lang, isWhiteLabelLoaded]);

  const currentLang =
    (localStorage.getItem('language') as AcceptedLanguages) ||
    AcceptedLanguages.pt;

  return {
    currentLang,
    isWhiteLabelLoaded,
  };
}

export default i18n;
