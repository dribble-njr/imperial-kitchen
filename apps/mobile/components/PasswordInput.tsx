import FieldInput from './FieldInput';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import { FieldInputProps } from './FieldInput';

export default function PasswordInput(props: FieldInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    Keyboard.dismiss();
    setShowPassword(!showPassword);
  };

  return (
    <FieldInput
      {...props}
      secureTextEntry={!showPassword}
      right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={handleTogglePassword} />}
    />
  );
}
