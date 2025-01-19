import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Surface, Carousel, SafeAreaSurface, Text } from '@/components/common';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function GuideScreen() {
  const { t } = useTranslation();
  const colors = useThemeColor();

  const handleSkip = async () => {
    // TODO: Add skip guide logic
    // sign in a test user
    router.replace('/');
  };

  const images = [
    'https://picsum.photos/400/700?random=1',
    'https://picsum.photos/400/700?random=2',
    'https://picsum.photos/400/700?random=3'
  ];

  return (
    <SafeAreaSurface style={styles.container}>
      <Surface style={styles.headerContainer}>
        <Text type="secondary" variant="bodySmall">
          {t('welcome')}
        </Text>
        <Button
          mode="contained-tonal"
          contentStyle={{ height: 30 }}
          labelStyle={{ height: 30, lineHeight: 30, color: colors.onSurfaceVariant }}
          style={{ borderRadius: 5, backgroundColor: colors.surfaceVariant }}
          onPress={handleSkip}
        >
          {t('auth.guide.start')}
        </Button>
      </Surface>

      <Text className="mt-4 text-2xl font-bold w-full">{t('slogan')}</Text>

      <Carousel images={images} style={styles.featureCard} />

      <Surface style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/(auth)/create-kitchen')}
          style={{ width: '100%' }}
          contentStyle={{ width: '100%' }}
          labelStyle={{ fontSize: 16 }}
        >
          {t('auth.createKitchen.title')}
        </Button>

        <Button
          mode="contained-tonal"
          onPress={() => router.push('/(auth)/join-kitchen')}
          style={styles.joinKitchen}
          labelStyle={{ fontSize: 16 }}
        >
          {t('auth.joinKitchen.title')}
        </Button>

        <Text style={styles.signInText}>
          <Text type="secondary">{t('auth.alreadyHaveAccount')}</Text>
          <Text
            type="link"
            onPress={async () => {
              router.push('/(auth)/sign-in');
            }}
          >
            {t('auth.signIn.title')}
          </Text>
        </Text>
      </Surface>
    </SafeAreaSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  featureCard: {
    alignSelf: 'center',
    width: '100%',
    flex: 1,
    marginVertical: 20
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    gap: 16
  },
  joinKitchen: {
    width: '100%',
    borderRadius: 20
  },
  signInText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10
  }
});
