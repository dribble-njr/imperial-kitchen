import { useThemeColor } from '@/hooks/useThemeColor';
import { Animated, useWindowDimensions } from 'react-native';
import { Modal as PaperModal, Portal, ModalProps as PaperModalProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

interface ModalProps extends PaperModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

// https://github.com/callstack/react-native-paper/issues/4140
// https://github.com/callstack/react-native-paper/pull/4574

export default function Modal({ visible, onDismiss, children }: ModalProps) {
  const { height } = useWindowDimensions();
  const translateY = useRef(new Animated.Value(height)).current;
  const colors = useThemeColor();

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [visible]);

  return (
    <Portal>
      <PaperModal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modal, {}]}>
        <Animated.View
          style={[
            styles.animatedContainer,
            { backgroundColor: colors.secondaryContainer, transform: [{ translateY }] }
          ]}
        >
          {children}
        </Animated.View>
      </PaperModal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
    borderRadius: 16
  },
  animatedContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10
  },
  modalContent: {
    marginBottom: 20
  }
});