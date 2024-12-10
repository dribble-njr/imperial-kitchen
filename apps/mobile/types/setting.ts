import { ColorName } from '@/constants/Colors';

export enum Languages {
  en = 'English',
  zh = '中文'
}

export type Language = 'en' | 'zh' | 'auto';

export interface Setting {
  color: ColorName;
  theme: 'light' | 'dark' | 'auto';
  language: Language;
}

export default Setting;
