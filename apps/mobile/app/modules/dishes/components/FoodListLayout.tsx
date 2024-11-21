import { Text, View } from 'react-native';
import { FoodType, FoodType2Slogan } from '../types';

export const FoodListLayout = ({ type }: { type: FoodType }) => {
  return (
    <View className="flex-1 p-4 pt-8 bg-[#f9f9f9]">
      <Text className="text-center text-2xl font-bold">{FoodType2Slogan[type]}</Text>
    </View>
  );
};
