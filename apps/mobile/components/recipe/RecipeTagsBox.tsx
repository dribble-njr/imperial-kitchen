import { CreateRecipeDTO, TagVO } from '@imperial-kitchen/types';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from '@/components/common';
import TagItem from './TagItem';
import TagSelectModal from './TagSelectModal';

const AddTagButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Surface style={styles.addTagButton} onTouchStart={onPress}>
      <Text style={styles.addTagButtonText}>+ 添加标签</Text>
    </Surface>
  );
};

export default function RecipeTagsBox({
  form,
  setForm
}: {
  form: CreateRecipeDTO;
  setForm: Dispatch<SetStateAction<CreateRecipeDTO>>;
}) {
  const { tags } = form;
  const onItemDelete = (tag: TagVO) => {
    setForm({ ...form, tags: tags.filter((t) => t.id !== tag.id) });
  };
  return (
    <Surface style={{ display: 'flex', flexDirection: 'row', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
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
    </Surface>
  );
}

const styles = StyleSheet.create({
  addTagButton: {
    width: 90,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addTagButtonText: {
    fontSize: 14
  }
});
