import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence
} from 'react-native-reanimated';
import { Text } from 'react-native-paper';
import { useEffect } from 'react';

export default function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }]
  }));

  const startWave = () => {
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
      4 // Run the animation 4 times
    );
  };

  useEffect(() => {
    startWave();
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.text} onPress={startWave}>
        👋
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6
  }
});
