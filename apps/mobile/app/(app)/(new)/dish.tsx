import { Modal, Surface } from '@/components/common';
import { FieldInput } from '@/components/form';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CreateDishDTO } from '@/types';
import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, List, Text } from 'react-native-paper';
import * as Yup from 'yup';

export default function Dish() {
  const colors = useThemeColor();
  const { t } = useTranslation();
  const validationSchema = Yup.object({
    name: Yup.string().required(`${t('common.enter')}${t('common.name')}`),
    price: Yup.number().required(`${t('common.enter')}${t('common.price')}`),
    kitchenId: Yup.number().required(`${t('common.enter')}${t('common.kitchenId')}`),
    categoryId: Yup.number().required(`${t('common.enter')}${t('common.categoryId')}`)
  });

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const createDish = (dto: CreateDishDTO) => {
    console.log(dto);
  };

  return (
    <Surface>
      <Formik
        initialValues={{ name: '', price: 0, kitchenId: '', categoryId: '' }}
        onSubmit={(values) => {
          const dto: CreateDishDTO = {
            ...values,
            kitchenId: 1,
            categoryId: 1
          };
          createDish(dto);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <List.Section>
            <List.Subheader>Some title</List.Subheader>
            <List.Item
              title="First Item"
              left={() => <List.Icon icon="folder" />}
              right={() => <FieldInput i18nKey="common" name="name" />}
            />
            <List.Item title="Second Item" left={() => <List.Icon color={colors.tertiary} icon="folder" />} />

            <FieldInput i18nKey="common" name="price" />
            <FieldInput i18nKey="common" name="kitchenId" />
            <FieldInput i18nKey="common" name="categoryId" />

            <Button onPress={() => handleSubmit()}>{t('common.confirm')}</Button>
          </List.Section>
        )}
      </Formik>

      <Modal visible={visible} onDismiss={hideModal}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>

      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
    </Surface>
  );
}
