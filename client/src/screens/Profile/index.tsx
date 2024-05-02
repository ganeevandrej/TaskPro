import { View, Text, TextInput } from "react-native";
import { Header } from "../../components/Header";
import { Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { useTheme } from "../../contexts/theme-context";
import { ImagePickerExample } from "../../components/FileUpload";

export const ProfileScreen: React.FC = (): React.JSX.Element => {
  const { toggleTheme, isThemeDark } = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View>
      <Header navigation={navigation} />
      <ImagePickerExample />
      <View>
        <Text>Черная тема</Text>
        <Switch value={isThemeDark} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};