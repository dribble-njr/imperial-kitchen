import { AuthProvider } from '@/context/AuthContext';
import '@/locales/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppSettingProvider } from '@/context/AppSettingContext';
import { AppTheme } from '@/components/AppTheme';
import '../global.css';
import { SSEProvider } from '@/context/SSEContext';

export default function Root() {
  return (
    <SafeAreaProvider>
      <AppSettingProvider>
        <AuthProvider>
          <SSEProvider>
            <AppTheme />
          </SSEProvider>
        </AuthProvider>
      </AppSettingProvider>
    </SafeAreaProvider>
  );
}
