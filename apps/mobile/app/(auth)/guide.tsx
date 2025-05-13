import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Surface, Text, Carousel, HelloWave } from '@/components/common';
import { globalStyles } from '@/assets/styles';
import HotPot from '@/assets/images/hot-pot.svg';
import Dumpling from '@/assets/images/dumpling.svg';
import Noodle from '@/assets/images/noodle.svg';

export default function GuideScreen() {
  const { t } = useTranslation();

  console.log('guide');

  return (
    <Surface style={styles.container}>
      <Carousel
        data={[HotPot, Dumpling, Noodle]}
        renderItem={(item) => {
          const SvgComponent = item;
          return (
            <View style={styles.svgWrapper}>
              <SvgComponent width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
            </View>
          );
        }}
        autoPlay={true}
        loop={true}
      />

      <Surface style={styles.content}>
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

          <Button mode="contained-tonal" onPress={() => router.push('/(auth)/sign-up')}>
            {t('auth.signIn.haveNoAccount')}
            {t('auth.signUp.title')}
          </Button>
        </Surface>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40
  },
  svgWrapper: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    justifyContent: 'center',
    gap: 32
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
  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
