import { useEffect } from 'react';
import { Keyboard, Platform, TextInput } from 'react-native';

// 在 React Native 中，键盘收起和输入框的焦点状态是两个独立的机制
// 如果需要在键盘收起的时候让 Input 失去焦点，需要主动调用这个 hook
export const useBlurOnKeyboardDismiss = (inputRef: React.RefObject<TextInput | null>) => {
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        inputRef.current?.blur();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
};
