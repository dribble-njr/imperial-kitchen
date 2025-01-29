import { globalStyles } from '@/assets/styles';
import { Surface, ParallaxScrollView, Text, Modal } from '@/components/common';
import { PasswordInput } from '@/components/form';
import { useToast } from '@/context/ToastContext';
import { UserService } from '@/service';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import CreatePasswordHero from '@/assets/images/create-password.svg';
import { useAuthFlowContext } from './_layout';
import { eventBus } from '@/utils/event-bus';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { SignInResponseVO } from '@/types';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SetPasswordScreen() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { email } = useAuthFlowContext();
  const colors = useThemeColor();

  const [modalVisible, setModalVisible] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [signInVO, setSignInVO] = useState<SignInResponseVO | null>(null);
  const [countdown, setCountdown] = useState(3);

  const handleRegister = async (values: { password: string; confirmPassword: string }) => {
    try {
      const res = await UserService.registerUser({ email, ...values });
      if (res) {
        setSignInVO(res);
        setModalVisible(true);
        setCountdown(3);

        timer.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              if (timer.current) {
                clearInterval(timer.current);
              }
              eventBus.emit('signIn', res);
              router.push('/');
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      showToast(error as string);
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, `${t('common.minPasswordLength')}`)
      .required(`${t('common.enter')}${t('common.password')}`),
    confirmPassword: Yup.string()
      .required(`${t('common.confirm')}${t('common.password')}`)
      .oneOf([Yup.ref('password')], t('common.passwordNotMatch'))
  });

  return (
    <ParallaxScrollView>
      <Surface style={globalStyles.hero}>
        <CreatePasswordHero width="100%" />
        <Text variant="titleLarge" style={{ textAlign: 'center' }}>
          {t('auth.setPassword.hero')}
        </Text>
        <Text variant="labelLarge" style={{ textAlign: 'center', marginTop: 8 }}>
          {t('auth.setPassword.description')}
        </Text>
      </Surface>

      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, validateForm }) => (
          <Surface style={globalStyles.form}>
            <PasswordInput i18nKey="common" name="password" />
            <PasswordInput i18nKey="common" name="confirmPassword" />

            <Button
              style={styles.button}
              mode="contained"
              onPress={async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length > 0) {
                  showToast(Object.values(errors)[0]);
                  return;
                }
                handleSubmit();
              }}
            >
              {t('auth.signUp.title')}
            </Button>
          </Surface>
        )}
      </Formik>

      <Modal
        visible={modalVisible}
        onDismiss={() => {
          setSignInVO(null);
          setModalVisible(false);
        }}
      >
        <View style={globalStyles.form}>
          <Text variant="titleLarge" style={{ textAlign: 'center' }}>
            注册成功
          </Text>
          <Text variant="labelLarge" style={{ textAlign: 'center', color: colors.secondary }}>
            {countdown} 秒后自动进入首页
          </Text>
          <Button
            mode="contained"
            onPress={() => {
              eventBus.emit('signIn', signInVO!);
              router.push('/');
            }}
          >
            直接进入
          </Button>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32
  }
});
