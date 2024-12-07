import { CreateRecipeDTO } from '@imperial-kitchen/types';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RecipeNameInputBox from '../components/RecipeNameInputBox';
import RecipeDifficultyRadioSelector from '../components/RecipeDifficultyRadioSelector';
import RecipeTagsBox from '../components/RecipeTagsBox';

const CardItem = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>{children}</View>
    </View>
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

export const RecipePage = () => {
  const [form, setForm] = useState<CreateRecipeDTO>({
    name: '',
    tags: [],
    steps: [],
    difficulty: undefined
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>菜谱设计</Text>
      </View>
      <View style={styles.cardContainer}>
        {CardItems.map((item) => (
          <CardItem key={item.title} title={item.title}>
            {item.content(form, setForm)}
          </CardItem>
        ))}
      </View>
      <View style={styles.footer}>
        <Button title="看看数据" onPress={() => console.log(form)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 238, 233)'
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
    color: 'rgba(116, 90, 26, 1)',
    fontWeight: 'bold'
  },
  cardContent: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  footer: {
    padding: 16
  }
});
