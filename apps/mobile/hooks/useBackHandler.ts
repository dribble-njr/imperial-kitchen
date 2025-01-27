import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Prevent default back handler
 * @param visible - Whether the component is visible
 * @param onBack - Back button handler
 */
export function useBackHandler(visible: boolean, onBack: () => void) {
  useEffect(() => {
    const handleBackPress = () => {
      if (visible) {
        onBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [visible, onBack]);
}
