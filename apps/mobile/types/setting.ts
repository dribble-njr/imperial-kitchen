import { ColorName } from '@/constants/Colors';

export type Language = 'en' | 'zh' | 'auto';

export interface Setting {
  color: ColorName;
  theme: 'light' | 'dark' | 'auto';
  language: Language;
}

export default Setting;
