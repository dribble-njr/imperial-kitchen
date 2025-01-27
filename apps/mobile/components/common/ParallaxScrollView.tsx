import { useRef, useState, type PropsWithChildren, type ReactElement } from 'react';
import { StyleSheet, ViewStyle, RefreshControl } from 'react-native';
import Animated from 'react-native-reanimated';
import Surface from './Surface';
import SafeAreaSurface from './SafeAreaSurface';

const HEADER_HEIGHT = 150;

type Props = PropsWithChildren<{
  variant?: 'full' | 'default';
  headerImage?: ReactElement;
  headerBackgroundColor?: string;
  contentContainerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  onRefresh?: () => void;
}>;

/**
 * When scroll quickly with scrollView, it will show white background, so we need to use Animated.ScrollView
 */
export default function ParallaxScrollView({
  variant = 'default',
  children,
  headerImage,
  headerBackgroundColor,
  contentContainerStyle,
  contentStyle,
  onRefresh
}: Props) {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await onRefresh?.();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaSurface variant={variant} style={{ position: 'relative' }}>
      {headerImage && (
        <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>{headerImage}</Animated.View>
      )}

      <Animated.ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        style={contentContainerStyle}
        refreshControl={
          onRefresh && (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              progressViewOffset={headerImage ? HEADER_HEIGHT : 0}
              tintColor="#999999"
              titleColor="#999999"
            />
          )
        }
      >
        <Surface style={[styles.content, contentStyle]} elevation={0} testID="parallax-scroll-view-content">
          {children}
        </Surface>
      </Animated.ScrollView>
    </SafeAreaSurface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: HEADER_HEIGHT,
    zIndex: 2
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
    gap: 16,
    borderRadius: 20
  }
});
