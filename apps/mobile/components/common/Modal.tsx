import { Modal as PaperModal, Portal, ModalProps as PaperModalProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Surface from './Surface';

interface ModalProps extends PaperModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

// https://github.com/callstack/react-native-paper/issues/4140
// https://github.com/callstack/react-native-paper/pull/4574

export default function Modal({ visible, onDismiss, children }: ModalProps) {
  return (
    <Portal>
      <PaperModal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modal]}>
        <Surface elevation={5} style={styles.contentContainer}>
          {children}
        </Surface>
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
  contentContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10
  },
  modalContent: {
    marginBottom: 20
  }
});
