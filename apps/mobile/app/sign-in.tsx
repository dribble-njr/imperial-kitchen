import { router } from 'expo-router';
import { Text, Button, Card } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useToken } from '@/context/AuthContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { signIn } = useToken();
  const { t } = useTranslation();

  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#9b98a1' }}>{t('welcome')}</Text>
      <Button mode="text" onPress={() => router.replace('/')}>
        {t('skip')}
      </Button>

      <ThemedText
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}
      >
        {t('signin')}
      </ThemedText>

      <Text style={styles.title}>Find interesting projects easily</Text>

      {/* Placeholder for the project card image */}
      <Card style={styles.projectCard}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.earnings}>$834.12</Text>
          <Text style={styles.monthlyTarget}>Monthly Target: $1000 (-175.88)</Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => console.log('Find a Service pressed')}
          style={styles.findServiceButton}
          labelStyle={styles.buttonLabel}
        >
          Find a Service
        </Button>
        <Button
          mode="contained"
          onPress={() => console.log('Become Freelancer pressed')}
          style={styles.becomeFreelancerButton}
          labelStyle={styles.buttonLabel}
        >
          Become Freelancer
        </Button>
      </View>

      <Text style={styles.loginText} onPress={() => signIn()}>
        Already have an account? Log In
      </Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5'
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center'
  },
  projectCard: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 20
  },
  cardContent: {
    alignItems: 'center'
  },
  earnings: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a90e2'
  },
  monthlyTarget: {
    fontSize: 14,
    color: '#888',
    marginTop: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30
  },
  findServiceButton: {
    width: '45%',
    borderRadius: 20
  },
  becomeFreelancerButton: {
    width: '45%',
    borderRadius: 20,
    backgroundColor: '#f0f0f0'
  },
  buttonLabel: {
    fontSize: 16
  },
  loginText: {
    fontSize: 14,
    color: '#4a90e2',
    textAlign: 'center',
    marginTop: 10
  }
});
