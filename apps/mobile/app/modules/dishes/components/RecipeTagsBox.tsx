import { CreateRecipeVO } from '@/types';
import { TagVO } from '@imperial-kitchen/types';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TagItem } from './TagItem';
import { TagSelectModal } from './TagSelectModal';

const AddTagButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.addTagButton} onTouchStart={onPress}>
      <Text style={styles.addTagButtonText}>+ 添加标签</Text>
    </View>
  );
};

export const RecipeTagsBox = ({
  form,
  setForm
}: {
  form: CreateRecipeVO;
  setForm: Dispatch<SetStateAction<CreateRecipeVO>>;
}) => {
  const { tags } = form;
  const onItemDelete = (tag: TagVO) => {
    setForm({ ...form, tags: tags.filter((t) => t.id !== tag.id) });
  };
  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {tags.map((tag) => (
        <TagItem active key={tag.id} tag={tag} onClose={() => onItemDelete(tag)} />
      ))}
      <TagSelectModal
        activeTags={tags.map((t) => t)}
        onSelect={(tag) => {
          setForm({ ...form, tags: [...tags, tag] });
        }}
        onItemDelete={onItemDelete}
        trigger={(show) => <AddTagButton onPress={show} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addTagButton: {
    backgroundColor: 'rgba(116, 90, 26, 0.1)',
    width: 90,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addTagButtonText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)'
  }
});
