import { FC, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { Card, FAB, List, Text, ProgressBar } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { DialogCreateCategory } from "../../components/Dialogs/CreateCategory";
import { Loading } from "../../components/custom/Loading";
import { CustomStatusBar } from "../../components/custom/StatusBar";
import PagerView from "react-native-pager-view";
import { ListCategories } from "./ListCategory";

export const CategoriesScreen: FC = (): JSX.Element => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.taskManagerReducer
  );
  const categoriesTransform = categories.filter(
    (el) => el.name !== "Планировщик"
  );
  const [visibleDialogCreateCategory, setVisibleDialogCreateCategory] =
    useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0.2);

  const onPageScroll = (e: any) => {
    switch (e.nativeEvent.position) {
      case 0:
        return setProgress(0.2);
      case 1:
        return setProgress(0.4);
      case 2:
        return setProgress(0.6);
      case 3:
        return setProgress(0.8);
      case 4:
        return setProgress(1);
      default:
        return setProgress(0.2);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomStatusBar />
      <Text
        style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
        variant="titleMedium"
      >
        {`Добро пожаловать в раздел  категорий!`}
      </Text>
      <Text
        style={{ textAlign: "center", marginHorizontal: 15, marginTop: 5 }}
        variant="titleMedium"
      >
        Максимизируйте своё время!
      </Text>
      <List.Section style={{ marginVertical: 0 }}>
        <List.Subheader style={{ marginHorizontal: 5 }}>Советы</List.Subheader>
        <View style={{ flexDirection: "column" }}>
          <PagerView
            style={styles.container}
            onPageSelected={onPageScroll}
            initialPage={0}
            overdrag={true}
          >
            <Card
              key="1"
              style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
            >
              <Card.Title
                titleVariant="titleMedium"
                title="1 Совет. Создавайте категории"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <Text variant="bodyMedium">
                  Создавайте категории, чтобы облегчить организацию задач по
                  областям и приоритетам.
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    color: "#808080",
                    textAlign: "justify",
                    fontStyle: "italic",
                  }}
                  variant="bodySmall"
                >
                  P.S. Категории позволяют вам эфективнее структурировать свои
                  задачи
                </Text>
              </Card.Content>
            </Card>
            <Card
              key="2"
              style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
            >
              <Card.Title
                titleVariant="titleMedium"
                title="2 Совет. Держите их в порядке"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <View>
                  <Text variant="bodyMedium">
                    Чистый и организованный список категорий помогает быстрее
                    находить нужные задачи
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#808080",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    variant="bodySmall"
                  >
                    P.S. Убедитесь, что ваши категории аккуратно организованы.
                  </Text>
                </View>
              </Card.Content>
            </Card>
            <Card
              key="3"
              style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
            >
              <Card.Title
                titleVariant="titleMedium"
                title="3 Совет. Регулярно обновляйте"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                  Не забывайте адаптировать категории под изменяющиеся
                  обстоятельства.
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    color: "#808080",
                    textAlign: "justify",
                    fontStyle: "italic",
                  }}
                  variant="bodySmall"
                >
                  P.S. Это поможет поддерживать актуальность и эффективность
                  управления задачами
                </Text>
              </Card.Content>
            </Card>
            <Card
              key="4"
              style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
            >
              <Card.Title
                titleVariant="titleMedium"
                title="4 Совет. Ограничивайте количество"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <View>
                  <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                    Слишком много категорий могут усложнить управление задачами
                    и запутать вас.
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#808080",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    variant="bodySmall"
                  >
                    P.S. Держите количество категорий в разумных пределах
                  </Text>
                </View>
              </Card.Content>
            </Card>
            <Card
              key="5"
              style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
            >
              <Card.Title
                titleVariant="titleMedium"
                title="5 Шаг. Простые названия"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                  Простые и понятные названия помогают быстрее находить нужные
                  задачи.
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    color: "#808080",
                    textAlign: "justify",
                    fontStyle: "italic",
                  }}
                  variant="bodySmall"
                >
                  P.S. Используйте понятные названия для категорий
                </Text>
              </Card.Content>
            </Card>
          </PagerView>
          <View style={{ marginTop: 10, width: "50%", alignSelf: "center" }}>
            <ProgressBar progress={progress} />
          </View>
        </View>
      </List.Section>
      <ScrollView>
        <List.Section style={{ marginTop: 0 }}>
          {isLoading ? (
            <Loading marginTop={160} />
          ) : (
            <ListCategories categories={categoriesTransform} marginTop={120} />
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
  container: {
    width: "100%",
    height: 167,
    paddingBottom: 10,
  },
});
