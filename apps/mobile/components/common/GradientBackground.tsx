import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { Platform, StatusBar, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const GradientBackground = (props: { height?: 'full' | number }) => {
  const theme = useTheme();
  const { height: windowHeight, width } = useWindowDimensions();

  const actualHeight =
    typeof props.height === 'number'
      ? props.height
      : props.height === 'full'
        ? windowHeight + (StatusBar.currentHeight || 0)
        : 300;

  return Platform.OS !== 'web' ? (
    <Canvas
      style={{
        left: 0,
        right: 0,
        position: 'absolute',
        height: actualHeight,
        width
      }}
    >
      <Rect x={0} y={0} width={width} height={actualHeight}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, actualHeight)}
          colors={[theme.colors.primary, theme.colors.inversePrimary]}
        />
      </Rect>
    </Canvas>
  ) : undefined;
};

export default GradientBackground;
