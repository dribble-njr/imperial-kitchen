import { StyleSheet } from 'react-native';
import { Surface } from '@/components/common';
import { Searchbar, SegmentedButtons } from 'react-native-paper';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type SearchType = 'dishes' | 'recipes';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('dishes');
  const { t } = useTranslation();

  return (
    <Surface>
      <Searchbar
        placeholder={t('common.search')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        autoFocus
        style={styles.searchBar}
      />

      <SegmentedButtons
        value={searchType}
        onValueChange={(value) => setSearchType(value as SearchType)}
        buttons={[
          { value: 'dishes', label: t('common.dishes') },
          { value: 'recipes', label: t('common.recipes') }
        ]}
        style={styles.segmentedButtons}
      />

      {/* 搜索结果区域 */}
      {/* {searchType === 'dishes' ? (
        // 菜品搜索结果
        <DishSearchResults query={searchQuery} />
      ) : (
        // 菜谱搜索结果
        <RecipeSearchResults query={searchQuery} />
      )} */}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  searchBar: {
    marginBottom: 16
  },
  segmentedButtons: {
    marginBottom: 16
  }
});
