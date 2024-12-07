import { router } from 'expo-router';
import { Text, Button, Card } from 'react-native-paper';
import { StyleSheet, useColorScheme } from 'react-native';
import { useToken } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { ThemedView } from '@/components/ThemedView';
import { ComponentColors } from '@/constants/Colors';

export default function Guide() {
  const { signIn } = useToken();
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const skip = async () => {
    // TODO: Add skip guide logic
    // sign in a test user
    router.replace('/');
  };

  return (
    <ThemedView safeArea className="flex justify-between items-center w-full h-full p-4 px-8">
      <ThemedView className="flex flex-row justify-between w-full items-center">
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
      </ThemedView>

      <Text className="mt-4 text-2xl font-bold w-full">{t('slogan')}</Text>

      <ThemedView style={styles.featureCard}>
        <Card.Cover style={{ flex: 1 }} source={{ uri: 'https://picsum.photos/700' }} />
      </ThemedView>

      <ThemedView className="flex flex-col justify-around w-full items-center gap-4">
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
              // TODO: add sign-in page
              await signIn();
              router.push('/login');
            }}
          >
            {t('signIn')}
          </Text>
        </Text>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  featureCard: {
    alignSelf: 'center',
    width: '100%',
    flex: 1,
    gap: 10,
    marginVertical: 20
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
