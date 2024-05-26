import { View, Text } from "react-native";
import { Header } from "../../components/Header";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../Navigation/DrawerContainer";

export const NotificationsScreen: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View>
      {/* <Header navigation={navigation} /> */}
      <Button mode="outlined">
        Уведомления
      </Button>
    </View>
  );
};