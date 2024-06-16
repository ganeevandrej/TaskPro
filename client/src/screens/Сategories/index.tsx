import { FC, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  Card,
  FAB,
  IconButton,
  List,
  Searchbar,
  TextInput,
  useTheme,
} from "react-native-paper";
import { ICategory } from "../../store/reducers/taskManager/TaskManagerSlice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";
import { StackShedulerParamList } from "../../Navigation/models";
import { DialogCreateCategory } from "../../components/Dialogs/CreateCategory";
import { Loading } from "../../components/custom/Loading";
import { DialogUpdateCategory } from "../../components/Dialogs/UpdateCategory";
import { fetchDeleteCategory } from "../../store/reducers/taskManager/ActionCreators";

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

export const CategoriesScreen: FC = (): JSX.Element => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.taskManagerReducer
  );
  const categoriesTransform = categories.filter(
    (el) => el.name !== "Планировщик"
  );
  const [visibleDialogCreateCategory, setVisibleDialogCreateCategory] =
    useState<boolean>(false);

  const renderItem = ({ item }: { item: ICategory }) => (
    <RenderItem item={item} />
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <List.Section style={{ marginTop: 0 }}>
          <List.Subheader style={{ paddingTop: 0 }}>Категории</List.Subheader>
          {isLoading ? (
            <Loading />
          ) : (
            <FlatList
              data={categoriesTransform}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
            />
          )}
        </List.Section>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setVisibleDialogCreateCategory(true)}
      />
      <DialogCreateCategory
        visible={visibleDialogCreateCategory}
        setVisible={setVisibleDialogCreateCategory}
      />
    </View>
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
});
