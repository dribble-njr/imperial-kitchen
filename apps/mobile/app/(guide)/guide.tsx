import { router } from 'expo-router';
import { Text, Button } from 'react-native-paper';
import { StyleSheet, useColorScheme } from 'react-native';
import { useToken } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { ComponentColors } from '@/constants/Colors';
import { SafeAreaSurface, Surface, Carousel } from '@/components';

export default function Guide() {
  const { signIn } = useToken();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const skip = async () => {
    // TODO: Add skip guide logic
    // sign in a test user
    router.replace('/');
  };

  const images = [
    'https://picsum.photos/700/400?random=1',
    'https://picsum.photos/700/400?random=2',
    'https://picsum.photos/700/400?random=3'
  ];

  return (
    <SafeAreaSurface style={styles.container}>
      <Surface style={styles.headerContainer}>
        <Text className="text-sm">{t('welcome')}</Text>
        <Button
          mode="contained-tonal"
          contentStyle={{ height: 30 }}
          labelStyle={{ height: 30, lineHeight: 30 }}
          style={{ borderRadius: 5 }}
          onPress={skip}
        >
          {t('skip')}
        </Button>
      </Surface>

      <Text className="mt-4 text-2xl font-bold w-full">{t('slogan')}</Text>

      <Carousel images={images} style={styles.featureCard} />

      <Surface style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/(guide)/create-kitchen')}
          style={{ width: '100%' }}
          contentStyle={{ width: '100%' }}
          labelStyle={{ fontSize: 16 }}
        >
          {t('createKitchen.title')}
        </Button>

        <Button
          mode="contained-tonal"
          onPress={() => router.push('/(guide)/join-kitchen')}
          style={styles.joinKitchen}
          labelStyle={{ fontSize: 16 }}
        >
          {t('joinKitchen.title')}
        </Button>

        <Text style={styles.signInText}>
          {t('alreadyHaveAccount')}
          <Text
            style={[
              styles.signInText,
              {
                color: colorScheme === 'dark' ? ComponentColors.dark?.primary : ComponentColors.light?.primary
              }
            ]}
            className="text-base"
            onPress={async () => {
              await signIn();
              router.push('/login');
            }}
          >
            {t('signIn')}
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
    padding: 20
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
    gap: 10,
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
