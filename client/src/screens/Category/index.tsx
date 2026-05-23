import { RouteProp, useRoute } from "@react-navigation/native";
import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, List, ProgressBar, Text } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { StackShedulerParamList } from "../../Navigation/models";
import { Loading } from "../../components/custom/Loading";
import { ListTasks } from "../Scheduler/ListTasks";
import { ShedulerFAB } from "../Scheduler/FAB";
import { useAppSelector } from "../../hooks/redux";
import { CustomStatusBar } from "../../components/custom/StatusBar";
import PagerView from "react-native-pager-view";

export const CategoryScreen: FC = (): JSX.Element => {
  const route = useRoute<RouteProp<StackShedulerParamList>>();
  const { tasks, categories } = useAppSelector(
    (state) => state.taskManagerReducer
  );
  const { isLoading } = useAppSelector((state) => state.taskManagerReducer);
  const params = route.params;
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

  const findTaskByCategory = (nameCategory: string | undefined) => {
    return tasks.filter((el) => el.category === nameCategory);
  };

  const findIdByName = (nameCategory: string | undefined) => {
    const category = categories.find((el) => el.name === nameCategory);
    return category?.id;
  };

  return (
    <View style={{ flex: 1 }}>
      <CustomStatusBar />
      <Text
        style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
        variant="titleMedium"
      >
        {`Добро пожаловать в категорию "${params?.title}"!`}
      </Text>
      <Text
        style={{ textAlign: "center", marginHorizontal: 15, marginTop: 5 }}
        variant="titleMedium"
      >
        Момент для продуктивности!
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
                title="1 Совет. Разделяйте и властвуйте"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                  Разделение задач на более мелкие части делает их менее
                  устрашающими и более управляемыми.
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
                  P.S. Разбивайте крупные задачи на более мелкие
                </Text>
              </Card.Content>
            </Card>
            <Card
              key="2"
              style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
            >
              <Card.Title
                titleVariant="titleMedium"
                title="2 Совет. Устанавливайте приоритеты"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <View>
                  <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                    Определяйте приоритеты и выполняйте самые важные задачи в
                    первую очередь.
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
                    P.S. Сосредоточение на самых важных задачах позволяет вам
                    быть уверенным
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
                title="3 Совет. Используйте Техники"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                  Используйте техники для управления временем в разделе
                  "Техники"
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
                  P.S. Экспериментируйте с разными подходами, чтобы найти тот,
                  который работает лучше всего для вас
                </Text>
              </Card.Content>
            </Card>
            <Card
              key="4"
              style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
            >
              <Card.Title
                titleVariant="titleMedium"
                title="4 Совет. Делайте перерывы"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <View>
                  <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                    Делайте регулярные перерывы для поддержания высокой
                    продуктивности.
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
                    P.S. Отдых позволяет вашему мозгу восстановиться и помогает
                    поддерживать работоспособность
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
                title="5 Шаг. Поощряйте себя"
              />
              <Card.Content style={{ marginTop: -8 }}>
                <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                  Не забывайте поощрять себя за выполнение задач, даже
                  небольших.
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
                  P.S. Маленькие признания ваших достижений могут значительно
                  повысить вашу мотивацию
                </Text>
              </Card.Content>
            </Card>
          </PagerView>
          <View style={{ marginTop: 10, width: "50%", alignSelf: "center" }}>
            <ProgressBar style={{marginBottom: 10}} progress={progress} />
          </View>
        </View>
      </List.Section>
      <ScrollView>
        {isLoading ? (
          <Loading marginTop={155} />
        ) : (
          <ListTasks
            marginTop={115}
            tasks={findTaskByCategory(params?.title)}
            categoryId={findIdByName(params?.title)}
          />
        )}
      </ScrollView>
      <ShedulerFAB categoryId={findIdByName(params?.title)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 167,
    paddingBottom: 10,
  },
});
