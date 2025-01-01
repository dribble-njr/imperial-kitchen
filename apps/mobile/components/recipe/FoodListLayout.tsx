import { FoodType2Slogan } from '@/types';
import { FoodType } from '@/types';
import { StyleSheet } from 'react-native';
import { Surface, Text } from '@/components/common';

const Header = ({ title }: { title: string }) => {
  return (
    <Surface style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </Surface>
  );
};

export default function FoodListLayout({ type }: { type: FoodType }) {
  return (
    <Surface style={styles.container}>
      <Header title={FoodType2Slogan[type]} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 8,
    paddingTop: 54,
    width: '100%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
