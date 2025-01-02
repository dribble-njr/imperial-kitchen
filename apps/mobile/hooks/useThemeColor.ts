/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useAppSetting } from '@/context/AppSettingContext';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

export function useThemeColor(): MD3Colors;
export function useThemeColor<K extends keyof MD3Colors>(colorType: K): MD3Colors[K];
export function useThemeColor(colorType?: keyof MD3Colors) {
  const { effectiveColorScheme, currentColor } = useAppSetting();

  return colorType
    ? Colors[effectiveColorScheme!][currentColor][colorType]
    : Colors[effectiveColorScheme!][currentColor];
}
