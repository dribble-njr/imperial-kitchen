import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import Surface from './Surface';

interface PasswordInputProps extends TextInputProps {
  i18nKey: string;
  name: string;
}

export default function PasswordInput({ i18nKey, name, ...textInputProps }: PasswordInputProps) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
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
        error={hasError}
        placeholder={`${t('common.enter')}${t(`${i18nKey}.${name}`)}...`}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={handleTogglePassword} />}
        {...textInputProps}
      />
      {hasError && <HelperText type="error">{meta.error}</HelperText>}
    </Surface>
  );
}
