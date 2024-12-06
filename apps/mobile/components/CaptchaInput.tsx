import FieldInput from './FieldInput';
import { TextInput } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import { FieldInputProps } from './FieldInput';
import { useTranslation } from 'react-i18next';

interface CaptchaInputProps extends FieldInputProps {
  onSendCaptcha: () => Promise<void>;
}

export default function CaptchaInput({ onSendCaptcha, ...props }: CaptchaInputProps) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <FieldInput
      {...props}
      right={
        <TextInput.Affix
          text={countdown > 0 ? `${countdown}s` : t('common.sendCaptcha')}
          onPress={countdown === 0 ? handleSendCaptcha : undefined}
        />
      }
    />
  );
}
