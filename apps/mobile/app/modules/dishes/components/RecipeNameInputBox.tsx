import CutleryIcon from '@/assets/icons/cutlery-icon.svg';
import { useBlurOnKeyboardDismiss } from '@/hooks/useBlurOnKeyBoardDismiss';
import { CreateRecipeVO } from '@/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const SPRING_CONFIG = {
  damping: 10,
  stiffness: 180,
  mass: 0.5
} as const;

export const RecipeNameInputBox = ({
  form,
  setForm
}: {
  form: CreateRecipeVO;
  setForm: Dispatch<SetStateAction<CreateRecipeVO>>;
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const spinValue = useSharedValue(0);

  useBlurOnKeyboardDismiss(inputRef);

  useEffect(() => {
    spinValue.value = isFocused ? 90 : 0;
  }, [isFocused]);

  const leftIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withSpring(`${spinValue.value}deg`, SPRING_CONFIG)
      }
    ]
  }));

  const rightIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withSpring(`${-spinValue.value}deg`, SPRING_CONFIG)
      }
    ]
  }));

  return (
    <View
      style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <Animated.View style={[{ marginRight: 6 }, leftIconStyle]}>
        <CutleryIcon width={28} height={28} />
      </Animated.View>
      <TextInput
        ref={inputRef}
        style={{ flex: 1, height: 40, backgroundColor: '#fff', textAlign: 'center', borderWidth: 0 }}
        value={form.name}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => setForm({ ...form, name: text.trim() })}
      />
      <Animated.View style={[{ marginLeft: 6 }, rightIconStyle]}>
        <CutleryIcon width={28} height={28} />
      </Animated.View>
    </View>
  );
};
