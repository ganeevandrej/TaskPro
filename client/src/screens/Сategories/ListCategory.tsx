import { FlatList, View, StyleSheet } from "react-native";
import { Card, IconButton, List, Text } from "react-native-paper";
import { ICategory } from "../../store/reducers/taskManager/TaskManagerSlice";
import { useState } from "react";
import { DialogUpdateCategory } from "../../components/Dialogs/UpdateCategory";
import { useAppDispatch } from "../../hooks/redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackShedulerParamList } from "../../Navigation/models";
import { fetchDeleteCategory } from "../../store/reducers/taskManager/ActionCreators";

interface IListCategoriesProps {
  categories: ICategory[];
  marginTop: number;
}

export interface IRenderItemProps {
  item: ICategory;
}

const RenderItem: React.FC<IRenderItemProps> = ({
  item,
}): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<StackShedulerParamList>>();
  const [visibleDialogUpdateCategory, setVisibleDialogUpdateCategory] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  const openCategory = (name: string) => {
    navigation.navigate("Category", { title: name });
  };

  return (
    <>
      <Card style={styles.card} onPress={() => openCategory(item.name)}>
        <Card.Title
          style={styles.cardTitle}
          title={item.name}
          right={() => (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <IconButton
                icon="folder-edit-outline"
                style={{ marginHorizontal: 0 }}
                onPress={() => setVisibleDialogUpdateCategory(true)}
              />
              <IconButton
                icon="folder-remove-outline"
                onPress={() => dispatch(fetchDeleteCategory(item.id))}
              />
            </View>
          )}
        />
      </Card>
      <DialogUpdateCategory
        visible={visibleDialogUpdateCategory}
        setVisible={setVisibleDialogUpdateCategory}
        category={item}
      />
    </>
  );
};

export const ListCategories: React.FC<IListCategoriesProps> = ({
  categories,
  marginTop,
}): React.JSX.Element => {
  const renderItem = ({ item }: { item: ICategory }) => (
    <RenderItem item={item} />
  );

  return (
      <List.Section style={{ marginTop: 0 }}>
        <List.Subheader style={{ marginTop: -5 }}>Категории</List.Subheader>
        {categories.length === 0 ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: marginTop,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text variant="titleSmall">Список пуст. Добавьте категорию!</Text>
          </View>
        ) : (
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          />
        )}
      </List.Section>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "90%",
    marginBottom: 10,
  },
  cardTitle: {
    // paddingRight: 7,
  },
  listItem: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  container: {
    width: "100%",
    height: 167,
    paddingBottom: 10,
  },
});
