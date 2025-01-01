import EasyFoodIcon from '@/assets/icons/easy-food-icon.svg';
import HardFoodIcon from '@/assets/icons/hard-food-icon.svg';
import MiddleFoodIcon from '@/assets/icons/middle-food-icon.svg';
import { CreateRecipeDTO, FoodDifficulty } from '@/types';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from '@/components/common';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const DifficultyConfigs = [
  {
    difficulty: FoodDifficulty.Easy,
    icon: EasyFoodIcon,
    text: '微波炉？'
  },
  {
    difficulty: FoodDifficulty.Middle,
    icon: MiddleFoodIcon,
    text: '正经做菜'
  },
  {
    difficulty: FoodDifficulty.Hard,
    icon: HardFoodIcon,
    text: '来点强度'
  }
];

const DifficultyItem = ({
  item,
  isActive,
  onSelect
}: {
  item: (typeof DifficultyConfigs)[number];
  isActive: boolean;
  onSelect: () => void;
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1.15, {
        damping: 8,
        stiffness: 250,
        mass: 0.4,
        velocity: 20
      });
    } else {
      scale.value = withTiming(0.9, {
        duration: 150
      });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value
      }
    ]
  }));

  return (
    <Surface style={[styles.item, isActive && styles.activeItem]} onTouchStart={onSelect}>
      <Animated.View style={animatedStyle}>
        <item.icon width={54} height={54} />
      </Animated.View>
      <Text style={styles.itemText}>{item.text}</Text>
    </Surface>
  );
};

export default function RecipeDifficultyRadioSelector({
  form,
  setForm
}: {
  form: CreateRecipeDTO;
  setForm: Dispatch<SetStateAction<CreateRecipeDTO>>;
}) {
  const { difficulty } = form;

  const handleSelect = useCallback((selectedDifficulty: typeof difficulty) => {
    setForm((prev) => ({ ...prev, difficulty: selectedDifficulty }));
  }, []);

  return (
    <Surface style={styles.container}>
      {DifficultyConfigs.map((item) => (
        <DifficultyItem
          key={item.difficulty}
          item={item}
          isActive={difficulty === item.difficulty}
          onSelect={() => handleSelect(item.difficulty)}
        />
      ))}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 4,
    width: '100%'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 16,
    width: '30%'
  },
  activeItem: {
    backgroundColor: 'rgba(116, 90, 26, 0.1)'
  },
  itemText: {
    fontSize: 12
  }
});
