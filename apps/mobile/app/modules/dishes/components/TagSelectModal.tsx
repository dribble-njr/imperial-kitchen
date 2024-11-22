import { ReactNode, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { ALL_TAGS } from '../mock';
import { TagVO } from '../types';
import { TagItem } from './TagItem';

export const TagSelectModal = ({
  trigger,
  activeTags,
  onSelect,
  onItemDelete
}: {
  trigger: (show: () => void) => ReactNode;
  activeTags: TagVO[];
  onSelect: (tag: TagVO) => void;
  onItemDelete: (tag: TagVO) => void;
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{
            width: '90%',
            height: '80%',
            position: 'absolute',
            top: '5%',
            left: '5%'
          }}
          contentContainerStyle={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderRadius: 30
          }}
        >
          <View style={{ display: 'flex', width: '100%', backgroundColor: '#fff', borderRadius: 30, padding: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {ALL_TAGS.map((tag) => (
                <TagItem
                  active={activeTags.some((t) => t.id === tag.id)}
                  key={tag.id}
                  tag={tag}
                  onPress={() => {
                    const isActive = activeTags.some((t) => t.id === tag.id);
                    isActive ? onItemDelete(tag) : onSelect(tag);
                  }}
                  onClose={() => onItemDelete(tag)}
                />
              ))}
            </View>
          </View>
        </Modal>
      </Portal>
      {trigger(showModal)}
    </>
  );
};
