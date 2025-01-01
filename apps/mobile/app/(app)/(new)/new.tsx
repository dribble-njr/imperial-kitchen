import { globalStyles } from '@/assets/styles';
import { GradientBackground, Surface } from '@/components/common';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTranslation } from 'react-i18next';
import { IconButton, Text, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const TAB_BAR_HEIGHT = 80;

export default function New() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const colors = useThemeColor();

  return (
    <Surface
      style={[
        globalStyles.screenContent,
        { flex: 1, justifyContent: 'space-between', paddingTop: insets.top + 20, paddingBottom: insets.bottom }
      ]}
      testID="new-screen"
    >
      <GradientBackground height="full" />
      <Text style={{ color: colors.inversePrimary }} variant="headlineLarge">
        {t('slogan')}
      </Text>

      <Surface style={styles.container}>
        <Surface style={[styles.transparent, styles.container]}>
          <Button mode="contained" onPress={() => router.push('/(app)/(new)/dish')}>
            {t('create.dish')}
          </Button>
        </Surface>

        <Surface style={[styles.transparent, { height: TAB_BAR_HEIGHT }]}>
          <IconButton
            icon="close"
            animated
            iconColor={colors.onTertiaryContainer}
            size={24}
            onPress={() => router.back()}
          />
        </Surface>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});
