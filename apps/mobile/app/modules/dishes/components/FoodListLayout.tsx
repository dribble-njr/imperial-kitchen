import { FoodType, FoodType2Slogan } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export const FoodListLayout = ({ type }: { type: FoodType }) => {
  return (
    <View className="flex-1 bg-[#f9f9f9]">
      <Header title={FoodType2Slogan[type]} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 8,
    paddingTop: 54,
    backgroundColor: '#fff',
    width: '100%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
