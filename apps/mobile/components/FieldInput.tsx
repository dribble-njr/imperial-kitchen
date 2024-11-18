import { ThemedView } from '@/components/ThemedView';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

interface FieldInputProps extends TextInputProps {
  i18nKey: string;
  name: string;
}

export default function FieldInput({ i18nKey, name, ...textInputProps }: FieldInputProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  const { t } = useTranslation();

  return (
    <ThemedView>
      <TextInput
        mode="outlined"
        label={t(`${i18nKey}.${name}`)}
        value={field.value}
        error={hasError}
        placeholder={`${t('common.enter')}${t(`${i18nKey}.${name}`)}...`}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        {...textInputProps}
      />
      {hasError && <HelperText type="error">{meta.error}</HelperText>}
    </ThemedView>
  );
}
