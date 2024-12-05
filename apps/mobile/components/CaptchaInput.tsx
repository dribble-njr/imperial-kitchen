import { ThemedView } from '@/components/ThemedView';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';

interface CaptchaInputProps extends TextInputProps {
  i18nKey: string;
  name: string;
  onSendCaptcha: () => Promise<void>;
}

export default function CaptchaInput({ i18nKey, name, onSendCaptcha, ...textInputProps }: CaptchaInputProps) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [countdown]);

  const handleSendCaptcha = async () => {
    await onSendCaptcha();
    setCountdown(60);
  };

  return (
    <ThemedView>
      <TextInput
        mode="outlined"
        label={t(`${i18nKey}.${name}`)}
        value={field.value}
        error={hasError}
        placeholder={`${t('common.enter')}${t(`${i18nKey}.${name}`)}...`}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        right={
          <TextInput.Affix
            text={countdown > 0 ? `${countdown}s` : t('common.sendCaptcha')}
            onPress={countdown === 0 ? handleSendCaptcha : undefined}
          />
        }
        {...textInputProps}
      />
      {hasError && <HelperText type="error">{meta.error}</HelperText>}
    </ThemedView>
  );
}
