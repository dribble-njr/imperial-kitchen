import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextInput, TextInputProps } from 'react-native-paper';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import Surface from '../common/Surface';

interface PasswordInputProps extends TextInputProps {
  i18nKey: string;
  name: string;
}

export default function PasswordInput({ i18nKey, name, ...textInputProps }: PasswordInputProps) {
  const [field, , helpers] = useField(name);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    Keyboard.dismiss();
    setShowPassword(!showPassword);
  };

  return (
    <Surface>
      <TextInput
        mode="outlined"
        label={t(`${i18nKey}.${name}`)}
        value={field.value}
        placeholder={`${t('common.enter')}${t(`${i18nKey}.${name}`)}...`}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={handleTogglePassword}
            style={{ opacity: field.value ? 1 : 0 }}
          />
        }
        {...textInputProps}
      />
    </Surface>
  );
}
