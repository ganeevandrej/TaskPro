import { View, ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";

export const TechnipuesScreen: React.FC = (): React.JSX.Element => {
  return (
    <View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Card style={{ width: "90%", marginTop: 20 }}>
          <Card.Cover
            style={{ resizeMode: "contain", borderBottomRightRadius: 0, borderBottomLeftRadius: 0  }}
            source={require("../../../assets/eatThatFrog.png")}
          />
          <Card.Title title={"Eat That Frog!"} />
          <Card.Content style={{ paddingTop: 0 }}>
            <Text style={{ width: "95%", textAlign: "justify" }}>
              Это методика, предложенная Брайаном Трейси, которая призывает
              начинать день с выполнения самой сложной и важной задачи (или
              "съесть самую большую лягушку"), чтобы улучшить продуктивность и
              достичь больших результатов.
            </Text>
          </Card.Content>
        </Card>
        <Card style={{ width: "90%", marginTop: 20 }}>
          <Card.Cover
            style={{ resizeMode: "contain", borderBottomRightRadius: 0, borderBottomLeftRadius: 0  }}
            source={require("../../../assets/pomodoro.jpg")}
          />
          <Card.Title title={"Pomodoro Technique"} />
          <Card.Content style={{ paddingTop: 0 }}>
            <Text style={{ width: "95%", textAlign: "justify" }}>
              Это методика управления временем, разработанная Франческо Чирилло,
              которая предлагает разделить рабочее время на периоды (обычно 25
              минут), называемые "помидорами", с последующим коротким перерывом.
            </Text>
          </Card.Content>
        </Card>
        <Card style={{ width: "90%", marginTop: 20, marginBottom: 20 }}>
          <Card.Cover
            style={{ resizeMode: "contain", borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
            source={require("../../../assets/1-2-3-4.jpg")}
          />
          <Card.Title title={"1-2-3-4 Method"} />
          <Card.Content style={{ paddingTop: 0 }}>
            <Text style={{ width: "95%", textAlign: "justify" }}>
              В этой методике вы выбираете одну главную цель (1), две
              второстепенные цели (2) и три дополнительные задачи (3), которые
              нужно выполнить в течение дня. Это помогает установить ясные
              приоритеты и концентрироваться на наиболее значимых задачах.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};