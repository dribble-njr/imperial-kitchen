import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextInput, TextInputProps } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import Surface from '../common/Surface';

interface CaptchaInputProps extends TextInputProps {
  i18nKey: string;
  name: string;
  onSendCaptcha: () => Promise<void>;
}

export default function CaptchaInput({ i18nKey, name, onSendCaptcha, ...textInputProps }: CaptchaInputProps) {
  const [field, , helpers] = useField(name);
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
    <Surface>
      <TextInput
        mode="outlined"
        label={t(`${i18nKey}.${name}`)}
        value={field.value}
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
    </Surface>
  );
}
