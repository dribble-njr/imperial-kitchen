import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export const CreateRecipeGuide = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>今天想整什么黑暗料理？</Text>
      </View>
      <View style={styles.content}>
        <View
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  header: {
    padding: 8,
    paddingTop: 54,
    backgroundColor: '#fff',
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
