import { FC, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Card, List, ProgressBar, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";
import CustomTimer from "../../components/custom/Timer";

export const PomodoroScreen: FC = (): JSX.Element => {
  const [progress, setProgress] = useState<number>(0.4);

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
          style={{width: "100%", height: 200}}
          source={require("../../../assets/pomodoro.jpg")}
        />
        <ScrollView style={{marginBottom: 120}}>
        <Text
          style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
          variant="titleMedium"
        >
          Добро пожаловать в раздел, посвящённый технике Pomodoro!
        </Text>
        <List.Section>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Основная идея
          </List.Subheader>
          <Card key="1" style={{ width: "90%", marginLeft: 20 }}>
            <Card.Content>
              <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                Заключается в разделении работы на короткие, строго ограниченные
                временные интервалы, чередующиеся с небольшими перерывами.
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
                  title="1 Шаг. Выберите задачу"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Определите задачу, над которой собираетесь работать.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Выберите одну из задач, созданных в разделе техники
                    1-3-5 Method
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="2"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="2 Шаг. Установите таймер"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Выберите тихое и удобное место, чтобы ничто не отвлекало вас
                    от работы.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Таймер уже настроен
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="3"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="3 Шаг. Начинайте работать"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Полностью сосредоточьтесь на задаче. Не отвлекайтесь на
                    посторонние дела.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Работайте пока не истечёт таймер
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="4"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="4 Шаг. Сделайте короткий перерыв"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Когда таймер прозвенит, сделайте короткий перерыв.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Это поможет вам восстановить концентрацию.
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="5"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="5 Шаг. Повторите цикл"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Начните новый "Pomodoro" и повторите шаги 2-4.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. После каждого четвёртого "Pomodoro" сделайте более
                    длительный перерыв (15-30 минут).
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
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Таймер
          </List.Subheader>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
              style={{
                borderRadius: 150,
                borderWidth: 2,
                borderColor: "#b71f15",
                backgroundColor: "#fff",
                overflow: "hidden",
                width: 150,
                height: 150,
              }}
            >
              <CustomTimer />
            </View>
          </View>
        </List.Section>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 180,
    paddingBottom: 10,
  },
});
