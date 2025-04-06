import { BottomSheetTextInput as TextInput } from '@gorhom/bottom-sheet';
import { StyleSheet, TextInputProps, View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useState } from 'react';
import Surface from './Surface';

interface BottomSheetTextInputProps extends TextInputProps {
  variant?: 'password' | 'default';
}

export default function BottomSheetTextInput({ style, variant, value, ...rest }: BottomSheetTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const shouldSecureEntry = variant === 'password' && !showPassword;

  return (
    <View style={styles.container}>
      <TextInput
        {...rest}
        style={[styles.input, style]}
        secureTextEntry={shouldSecureEntry}
        className="web-input-reset"
      />
      {variant === 'password' && (
        <Surface style={[styles.iconContainer, { opacity: value ? 1 : 0 }]}>
          <PaperTextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={handleTogglePassword} />
        </Surface>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    color: '#000000',
    paddingRight: 50,
    flex: 1,
    outline: 'none'
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
