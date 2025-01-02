import { useThemeColor } from '@/hooks/useThemeColor';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { Platform, StatusBar, useWindowDimensions } from 'react-native';

const GradientBackground = (props: { height?: 'full' | number }) => {
  const colors = useThemeColor();
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
          colors={[colors.primary, colors.inversePrimary]}
        />
      </Rect>
    </Canvas>
  ) : undefined;
};

export default GradientBackground;
