import { ColorName } from '@/constants/Colors';

export enum Languages {
  en = 'English',
  zh = '中文'
}

export type Language = 'en' | 'zh' | 'auto';

export type Theme = 'light' | 'dark' | 'auto';

export interface AppSetting {
  color: ColorName;
  theme: Theme;
  language: Language;
}

export default AppSetting;
