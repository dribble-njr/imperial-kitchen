import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Surface, Text } from '@/components/common';

export default function CreateRecipeGuide() {
  return (
    <Surface style={styles.container}>
      <Surface style={styles.header}>
        <Text style={styles.title}>今天想整什么黑暗料理？</Text>
      </Surface>
      <Surface style={styles.content}>
        <Surface
          style={{
            height: 100,
            width: 100,
            borderRadius: 20,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onTouchStart={() => {
            router.push('/menu/recipe');
          }}
        >
          <Text>动手吧</Text>
        </Surface>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 8,
    paddingTop: 54,
    width: '100%'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    flex: 1,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
