import { View, ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { StackTechniquesParamList } from "../../Navigation/models";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const TechnipuesScreen: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<StackTechniquesParamList>>();

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Card
          style={styles.card}
          onPress={() => navigation.navigate("EatThatFrog")}
        >
          <Card.Cover
            style={styles.cardCover}
            source={require("../../../assets/eatThatFrog.png")}
          />
          <Card.Title title={"Eat That Frog!"} />
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardText}>
              Это методика, предложенная Брайаном Трейси, которая призывает
              начинать день с выполнения самой сложной и важной задачи (или
              "съесть самую большую лягушку"), чтобы улучшить продуктивность и
              достичь больших результатов.
            </Text>
          </Card.Content>
        </Card>
        <Card
          style={styles.card}
          onPress={() => navigation.navigate("Pomodoro")}
        >
          <Card.Cover
            style={styles.cardCover}
            source={require("../../../assets/pomodoro.jpg")}
          />
          <Card.Title title={"Pomodoro Technique"} />
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardText}>
              Это методика управления временем, разработанная Франческо Чирилло,
              которая предлагает разделить рабочее время на периоды (обычно 25
              минут), называемые "помидорами", с последующим коротким перерывом.
            </Text>
          </Card.Content>
        </Card>
        <Card
          style={{ ...styles.card, marginBottom: 20 }}
          onPress={() => navigation.navigate("Method")}
        >
          <Card.Cover
            style={styles.cardCover}
            source={require("../../../assets/1-2-3-4.jpg")}
          />
          <Card.Title title={"1-3-5 Method"} />
          <Card.Content style={styles.cardContent}>
            <Text style={styles.cardText}>
              В этой методике вы выбираете одну главную цель (1), две
              второстепенные цели (3) и три дополнительные задачи (5), которые
              нужно выполнить в течение дня. Это помогает установить ясные
              приоритеты и концентрироваться на наиболее значимых задачах.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: "90%",
    marginTop: 20,
  },
  cardCover: {
    resizeMode: "contain",
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  cardContent: {
    paddingTop: 0,
  },
  cardText: {
    width: "95%",
    textAlign: "justify",
  },
});
