/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { ThemeProp } from 'react-native-paper/lib/typescript/types';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark
  }
};

export const ComponentColors: Record<'light' | 'dark', ThemeProp['colors']> = {
  light: {
    primary: 'rgb(100, 97, 0)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(237, 231, 109)',
    onPrimaryContainer: 'rgb(30, 28, 0)',
    secondary: 'rgb(121, 89, 0)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 223, 160)',
    onSecondaryContainer: 'rgb(38, 26, 0)',
    tertiary: 'rgb(135, 82, 0)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 221, 186)',
    onTertiaryContainer: 'rgb(43, 23, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(28, 28, 22)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(28, 28, 22)',
    surfaceVariant: 'rgb(231, 227, 209)',
    onSurfaceVariant: 'rgb(73, 71, 58)',
    outline: 'rgb(122, 119, 104)',
    outlineVariant: 'rgb(202, 199, 181)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(49, 48, 43)',
    inverseOnSurface: 'rgb(244, 240, 231)',
    inversePrimary: 'rgb(208, 203, 84)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 243, 242)',
      level2: 'rgb(243, 239, 235)',
      level3: 'rgb(238, 234, 227)',
      level4: 'rgb(236, 233, 224)',
      level5: 'rgb(233, 229, 219)'
    },
    surfaceDisabled: 'rgba(28, 28, 22, 0.12)',
    onSurfaceDisabled: 'rgba(28, 28, 22, 0.38)',
    backdrop: 'rgba(50, 49, 37, 0.4)'
  },
  dark: {
    primary: 'rgb(212, 202, 82)',
    onPrimary: 'rgb(53, 49, 0)',
    primaryContainer: 'rgb(77, 72, 0)',
    onPrimaryContainer: 'rgb(241, 230, 107)',
    secondary: 'rgb(248, 189, 42)',
    onSecondary: 'rgb(64, 45, 0)',
    secondaryContainer: 'rgb(92, 67, 0)',
    onSecondaryContainer: 'rgb(255, 223, 160)',
    tertiary: 'rgb(255, 184, 101)',
    onTertiary: 'rgb(72, 42, 0)',
    tertiaryContainer: 'rgb(102, 61, 0)',
    onTertiaryContainer: 'rgb(255, 221, 186)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(29, 28, 22)',
    onBackground: 'rgb(230, 226, 217)',
    surface: 'rgb(29, 28, 22)',
    onSurface: 'rgb(230, 226, 217)',
    surfaceVariant: 'rgb(73, 71, 58)',
    onSurfaceVariant: 'rgb(203, 199, 181)',
    outline: 'rgb(148, 145, 129)',
    outlineVariant: 'rgb(73, 71, 58)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(230, 226, 217)',
    inverseOnSurface: 'rgb(50, 48, 43)',
    inversePrimary: 'rgb(103, 96, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(38, 37, 25)',
      level2: 'rgb(44, 42, 27)',
      level3: 'rgb(49, 47, 29)',
      level4: 'rgb(51, 49, 29)',
      level5: 'rgb(55, 52, 30)'
    },
    surfaceDisabled: 'rgba(230, 226, 217, 0.12)',
    onSurfaceDisabled: 'rgba(230, 226, 217, 0.38)',
    backdrop: 'rgba(50, 49, 36, 0.4)'
  }
};
