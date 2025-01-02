import { RecipeDifficultyRadioSelector, RecipeNameInputBox, RecipeTagsBox } from '@/components/recipe';
import { CreateRecipeDTO } from '@/types';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Surface, Text } from '@/components/common';

const CardItem = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <Surface style={{ width: '100%' }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Surface style={styles.cardContent}>{children}</Surface>
    </Surface>
  );
};

const CardItems: {
  title: string;
  content: (form: CreateRecipeDTO, setForm: Dispatch<SetStateAction<CreateRecipeDTO>>) => ReactNode;
}[] = [
  {
    title: '1. 料理名称',
    content: (form, setForm) => <RecipeNameInputBox form={form} setForm={setForm} />
  },
  {
    title: '2. 选择烹饪难度',
    content: (form, setForm) => <RecipeDifficultyRadioSelector form={form} setForm={setForm} />
  },
  {
    title: '3. 选择标签',
    content: (form, setForm) => <RecipeTagsBox form={form} setForm={setForm} />
  }
];

export default function RecipePage() {
  const [form, setForm] = useState<CreateRecipeDTO>({
    name: '',
    tags: [],
    steps: [],
    difficulty: undefined
  });

  return (
    <Surface style={styles.container}>
      <Surface style={styles.header}>
        <Text style={styles.title}>菜谱设计</Text>
      </Surface>
      <Surface style={styles.cardContainer}>
        {CardItems.map((item) => (
          <CardItem key={item.title} title={item.title}>
            {item.content(form, setForm)}
          </CardItem>
        ))}
      </Surface>
      <Surface style={styles.footer}>
        <Button title="看看数据" onPress={() => console.log(form)} />
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 8,
    paddingTop: 54
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardContainer: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  cardContent: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8
  },
  footer: {
    padding: 16
  }
});
