import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Surface, SafeAreaSurface, Text, Carousel, HelloWave } from '@/components/common';
import { globalStyles } from '@/assets/styles';
import HotPot from '@/assets/images/hot-pot.svg';
import Dumpling from '@/assets/images/dumpling.svg';
import Noodle from '@/assets/images/noodle.svg';

export default function GuideScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaSurface style={styles.container}>
      <Carousel
        images={[
          <Surface style={styles.svgContainer}>
            <HotPot width="100%" height="100%" />
          </Surface>,
          <Surface style={styles.svgContainer}>
            <Dumpling width="100%" height="100%" />
          </Surface>,
          <Surface style={styles.svgContainer}>
            <Noodle width="100%" height="100%" />
          </Surface>
        ]}
        style={styles.carousel}
      />

      <Surface style={styles.headerContainer}>
        <Surface style={styles.welcome}>
          <Text type="secondary" variant="titleLarge" style={globalStyles.textCenter}>
            {t('auth.guide.welcome')}
          </Text>
          <HelloWave />
        </Surface>
        <Text variant="bodySmall" style={globalStyles.textCenter}>
          {t('auth.guide.slogan')}
        </Text>
      </Surface>

      <Surface style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => router.push('/(auth)/sign-in')}>
          {t('auth.alreadyHaveAccount')}
          {t('auth.signIn.title')}
        </Button>

        <Button mode="contained-tonal" onPress={() => router.push('/(auth)/join-kitchen')}>
          {t('auth.signIn.haveNoAccount')}
          {t('auth.signUp.title')}
        </Button>
      </Surface>
    </SafeAreaSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 40
  },
  headerContainer: {
    gap: 16,
    marginVertical: 20
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 16
  },
  carousel: {
    width: '100%',
    height: 300,
    flex: 1,
    marginBottom: 20
  },
  svgContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
