import { FC, useState } from "react";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { List, Text, Card, ProgressBar } from "react-native-paper";
import { CustomButton } from "../../components/custom/Button";

export const MethodScreen: FC = (): JSX.Element => {
  const [progress, setProgress] = useState<number>(0.4);
  const [largeTask, setLargeTask] = useState<number>();
  const [mediumTask, setMediumTask] = useState<number>();
  const [smallTask, setSmallTask] = useState<number>();

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
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Image
        style={{ width: "100%", height: 200 }}
        source={require("../../../assets/1-2-3-4.jpg")}
      />
      <ScrollView style={{ marginBottom: 100 }}>
        <Text
          style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
          variant="titleMedium"
        >
          Добро пожаловать в раздел, посвящённый технике 1-3-5 Method!
        </Text>
        <List.Section>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Основная идея
          </List.Subheader>
          <Card style={{ width: "90%", marginLeft: 20 }}>
            <Card.Content>
              <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                Обеспечить правильный баланс между крупными и мелкими делами в
                течение дня. Следуя этому простому принципу, вы сможете лучше
                организовать своё время и повысить продуктивность.
              </Text>
            </Card.Content>
          </Card>
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Инструция
          </List.Subheader>
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
                  title="1 Шаг. Установите 1 крупную задачу"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Выберите одну основную задачу на день, которая требует
                    значительных усилий и времени.
                  </Text>
                  <Text style={{ marginTop: 10, color: "#666666", fontStyle: "italic"  }} variant="bodyMedium">
                    P.S. Это самая важная задача, которую нужно обязательно
                    выполнить
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="2"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="2 Шаг. Выберите 3 средних задачи"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Определите 3 задачи среднего размера. Они тоже важны, но не
                    столь масштабны, как основная задача.
                  </Text>
                  <Text style={{ marginTop: 10, color: "#666666", fontStyle: "italic"  }} variant="bodyMedium">
                    P.S. Они должны дополнять ваш день и продвигать вас к вашим
                    целям.
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="3"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="3 Шаг. Определите 5 мелких задач"
                />
                <Card.Content>
                  <Text variant="titleSmall">
                    Определите 5 небольших задач, которые являются менее важными
                    делами, например рутинные.
                  </Text>
                  <Text style={{ marginTop: 10, color: "#666666", fontStyle: "italic" }} variant="titleSmall">
                    P.S. Эти задачи должны быть короткими и не требовать много
                    времени
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="4"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="4 Шаг. Распределите задачи"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Начните с выполнения крупной задачи, затем переходите к
                    средним и завершайте мелкими.
                  </Text>
                  <Text style={{ marginTop: 10, color: "#7DAFDF", fontStyle: "italic"  }} variant="bodyMedium">
                    P.S. Советуем зайти в раздел техники "Eat That Frog!".
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="5"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="5 Шаг. Завершайте задачи"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    По мере выполнения задач отмечайте их как завершённые.
                  </Text>
                  <Text style={{ marginTop: 10, color: "#9C27B0", fontStyle: "italic"  }} variant="bodyMedium">
                    P.S. Это позволит вам видеть свой прогресс и поддерживать
                    мотивацию.
                  </Text>
                </Card.Content>
              </Card>
            </PagerView>
            <View style={{ marginTop: 10, width: "50%", alignSelf: "center" }}>
              <ProgressBar progress={progress} />
            </View>
          </View>
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader>
            <Text>Крупная Задача</Text>
          </List.Subheader>
          {largeTask ? <View></View> : (
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Text variant="bodyMedium">Список пуст.</Text>
          <CustomButton
              title="Добавьте задачу"
              callback={() => console.log("hu")}
            />
            </View>
            )}
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader>
            <Text>Средние Задачи</Text>
          </List.Subheader>
          {mediumTask ? <View></View> : (
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Text variant="bodyMedium">Список пуст.</Text>
          <CustomButton
              title="Добавьте задачи"
              callback={() => console.log("hu")}
            />
            </View>
            )}
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader>
            <Text>Мелкие Задачи</Text>
          </List.Subheader>
          {smallTask ? <View></View> : (
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Text variant="bodyMedium">Список пуст.</Text>
          <CustomButton
              title="Добавьте задачи"
              callback={() => console.log("hu")}
            />
            </View>
            )}
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    paddingBottom: 10,
  },
});
