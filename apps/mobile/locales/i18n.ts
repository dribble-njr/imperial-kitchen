import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import English from './en';
import Chinese from './zh';

const resources = {
  en: { translation: English },
  zh: { translation: Chinese }
};

export const getUserLanguage = () => {
  try {
    const locales = Localization.getLocales();
    if (locales.length > 0) {
      return locales[0].languageCode ?? 'zh';
    } else {
      return 'zh';
    }
  } catch (error) {
    // console.error('Error retrieving language preference:', error);
    return 'zh';
  }
};

const language = getUserLanguage();

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  lng: language,
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  react: {
    useSuspense: false // avoid suspense problem
  }
});

export default i18n;
