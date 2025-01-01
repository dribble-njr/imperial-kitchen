import CloseIcon from '@/assets/icons/close-icon.svg';
import { TagVO } from '@/types';
import { Chip } from 'react-native-paper';

export default function TagItem({
  tag,
  onClose,
  onPress,
  active = false
}: {
  tag: TagVO;
  onClose?: () => void;
  onPress?: () => void;
  active?: boolean;
}) {
  const _onClose = active ? onClose : undefined;
  return (
    <Chip
      closeIcon={() => <CloseIcon scale={0.5} />}
      textStyle={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.6)', marginHorizontal: 0 }}
      style={{
        backgroundColor: active ? 'rgba(116, 90, 26, 0.1)' : 'rgba(116, 90, 26, 0.08)',
        borderColor: active ? '#646464' : '#e0e0e0',
        borderWidth: 1.5
      }}
      onClose={_onClose}
      onPress={onPress}
    >
      {tag.name}
    </Chip>
  );
}
