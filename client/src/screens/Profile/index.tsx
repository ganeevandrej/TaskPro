import { View, Text, TextInput } from "react-native";
import { Header } from "../../components/Header";
import { Card, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { useTheme } from "../../contexts/theme-context";
import { ImagePickerExample } from "../../components/FileUpload";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Выполненные",
    population: 80,
    color: "#2ece25",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14,
  },
  {
    name: "Просроченные",
    population: 20,
    color: "#e74c3c",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14,
  },
];

export const ProfileScreen: React.FC = (): React.JSX.Element => {
  const { toggleTheme, isThemeDark } = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View>
      <Header navigation={navigation} />
      <View style={{ paddingHorizontal: 20 }}>
        <ImagePickerExample />
        <Card>
          <Card.Content
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: "50%" }}>Черная тема</Text>
            <Switch value={isThemeDark} onValueChange={toggleTheme} />
          </Card.Content>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Card.Title title={"Аналитика задач"} />
          <Card.Content>
            <PieChart
              data={data}
              width={screenWidth - 50}
              height={120}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"-25"}
              center={[0, 0]}
            />
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};
