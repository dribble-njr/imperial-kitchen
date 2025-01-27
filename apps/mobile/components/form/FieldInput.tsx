import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextInput, TextInputProps } from 'react-native-paper';

interface FieldInputProps extends TextInputProps {
  i18nKey: string;
  name: string;
}

export default function FieldInput({ i18nKey, name, ...textInputProps }: FieldInputProps) {
  const [field] = useField(name);
  const { t } = useTranslation();

  return (
    <TextInput
      mode="outlined"
      label={t(`${i18nKey}.${name}`)}
      value={field.value}
      placeholder={`${t('common.enter')}${t(`${i18nKey}.${name}`)}...`}
      onChangeText={field.onChange(name)}
      onBlur={field.onBlur(name)}
      {...textInputProps}
    />
  );
}
