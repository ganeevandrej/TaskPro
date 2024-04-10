import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { RootStackParamList } from "../../../../App";

export const Scheduler: React.FC = (): React.JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>Добро пожаловать!</Text>
      <TouchableRipple onPress={() => navigation.navigate("Registration")}>
          <Text>
            Зарегистрироваться
          </Text>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("Login")}>
          <Text>
            Войти
          </Text>
        </TouchableRipple>
    </View>
  );
};