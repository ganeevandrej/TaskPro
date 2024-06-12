import { FC, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Card, List, ProgressBar, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";

export const EatThatFlogScreen: FC = (): JSX.Element => {
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
        style={{ width: "100%", height: 200 }}
        source={require("../../../assets/eatThatFrog.png")}
      />
      <ScrollView style={{ marginBottom: 120 }}>
        <Text
          style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
          variant="titleMedium"
        >
          Добро пожаловать в раздел, посвящённый технике Eat That Flog!
        </Text>
        <List.Section>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Основная идея
          </List.Subheader>
          <Card key="1" style={{ width: "90%", marginLeft: 20 }}>
            <Card.Content>
              <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                Заключается в том, чтобы начинать день с выполнения самой
                сложной и важной задачи.
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
                  title="1 Шаг. Определите свою «лягушку»"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Выберите самую важную и трудную задачу на день — это ваша
                    "лягушка".
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Выберите крупную задачу, созданную в разделе о технике
                    "1-3-5 Method"
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="2"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="2 Шаг. Планирование «лягушки»"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    На кануне вечером или утром составьте список задач на день и
                    спланируйте свою "лягушку".
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Для этого можете воспользоваться разделом о технике
                    "1-3-5 Method".
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="3"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="3 Шаг. Выполнение «лягушки»"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Сразу после пробуждения и выполнения утренних рутин начните
                    работу с выполнения самой важной задачи.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Сосредоточьтесь на ней, пока она не будет завершена
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="4"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="4 Шаг. Избегайте отвлеканий"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    Во процессе выполнения «лягушки» избегайте отвлекающих
                    факторов.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Для эффективного выполнения «лягушки» воспользуйтесь
                    разделом о технике "Pomodoro".
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="5"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="5 Шаг. Завершение «лягушки»"
                />
                <Card.Content>
                  <Text variant="bodyMedium">
                    После завершения задачи отметьте её как завершенную. Затем
                    приступайте к выполнению менее крупных задач.
                  </Text>
                  <Text style={{ marginTop: 10 }} variant="bodyMedium">
                    P.S. Не забывайте отдыхать между задачами. Делайте перерывы в 30-45м.
                  </Text>
                </Card.Content>
              </Card>
            </PagerView>
            <View style={{ marginTop: 10, width: "50%", alignSelf: "center" }}>
              <ProgressBar progress={progress} />
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
    height: 200,
    paddingBottom: 10,
  },
});
