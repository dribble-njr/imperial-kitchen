import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from './Text';

interface BottomSheetProps {
  title?: string;
  children: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
  snapPoints?: (string | number)[];
  height?: number | string;
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  title,
  children,
  visible,
  onDismiss,
  snapPoints: customSnapPoints,
  height = '50%',
  enablePanDownToClose = true,
  enableDynamicSizing = false,
  style,
  containerStyle
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const { bottom } = useSafeAreaInsets();

  const snapPoints = useMemo(() => {
    if (customSnapPoints) return customSnapPoints;
    if (typeof height === 'number') return [height];
    return [height];
  }, [customSnapPoints, height]);

  React.useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ),
    []
  );

  const handleDismiss = useCallback(() => {
    dismiss();
    onDismiss();
  }, [dismiss, onDismiss]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={enablePanDownToClose}
      enableDynamicSizing={enableDynamicSizing}
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
      handleIndicatorStyle={styles.indicator}
      containerStyle={[{ paddingBottom: bottom }, containerStyle]}
      style={[styles.content, style]}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  content: {},
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  indicator: {
    backgroundColor: '#DEDEDE',
    width: 40
  }
});

export default BottomSheet;
