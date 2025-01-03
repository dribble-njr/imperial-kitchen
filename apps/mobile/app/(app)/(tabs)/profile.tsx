import { ParallaxScrollView, Surface } from '@/components/common';
import { useAuth } from '@/context/AuthContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Appbar, Avatar, Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { userInfo } = useAuth();
  const colors = useThemeColor();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ParallaxScrollView
      variant="full"
      headerImage={
        <>
          <Surface style={[styles.action, { top: insets.top }]} elevation={0}>
            <Appbar.Action
              icon={() => <SimpleLineIcons name="settings" size={24} color={colors.primary} />}
              onPress={() => router.push('/(app)/(profile)/setting')}
            />
          </Surface>
          <Surface style={styles.avatar} elevation={0}>
            <Avatar.Image size={64} source={{ uri: 'https://picsum.photos/128/128' }} />
          </Surface>
        </>
      }
      headerBackgroundColor="#2b2434"
      contentContainerStyle={{ marginTop: 40 }}
    >
      <Surface>
        <Text variant="titleLarge">{userInfo?.name}</Text>
        <Text>{userInfo?.email}</Text>

        <Button
          style={{ marginTop: 16 }}
          icon={() => <MaterialIcons name="mode-edit" size={16} color={colors.onPrimary} />}
          mode="contained"
          onPress={() => console.log('edit profile')}
        >
          编辑个人资料
        </Button>
      </Surface>

      <Surface elevation={5} style={styles.section}>
        <Text style={[styles.title, { color: colors.onSecondaryContainer }]}>加入时间</Text>
        <Text>{userInfo?.createdAt}</Text>
      </Surface>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  action: {
    position: 'absolute',
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24
  },
  avatar: {
    position: 'absolute',
    left: 24,
    right: 0,
    bottom: -32
  },
  section: {
    borderRadius: 12,
    padding: 16,
    gap: 8
  },
  title: {
    fontWeight: 700,
    fontSize: 16
  }
});
