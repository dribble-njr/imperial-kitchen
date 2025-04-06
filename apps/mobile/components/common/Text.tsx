import { Text as PaperText, TextProps } from 'react-native-paper';
import { TextStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

interface CustomTextProps extends TextProps<TextStyle> {
  type?: 'link' | 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
}

export default function Text({ children, type = 'default', style, ...props }: CustomTextProps) {
  const typeColor = () => {
    switch (type) {
      case 'link':
        return 'primary' as keyof MD3Colors;
      case 'secondary':
        return 'onSurfaceVariant' as keyof MD3Colors;
      case 'success':
        return 'tertiary' as keyof MD3Colors;
      case 'warning':
        return 'onSecondaryContainer' as keyof MD3Colors;
      case 'danger':
        return 'error' as keyof MD3Colors;
      default:
        return 'onSurface' as keyof MD3Colors;
    }
  };
  const color = useThemeColor(typeColor()) as string;

  return (
    <PaperText style={[{ color }, style]} {...props}>
      {children}
    </PaperText>
  );
}
