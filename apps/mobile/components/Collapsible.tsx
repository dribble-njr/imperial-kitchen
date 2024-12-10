import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import Surface from './Surface';

export default function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <Surface>
      <TouchableOpacity style={styles.heading} onPress={() => setIsOpen((value) => !value)} activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.default.onSurface : Colors.dark.default.onSurface}
        />
        <Text variant="titleSmall">{title}</Text>
      </TouchableOpacity>
      {isOpen && <Surface style={styles.content}>{children}</Surface>}
    </Surface>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  content: {
    marginTop: 6,
    marginLeft: 24
  }
});
