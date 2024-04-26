import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { View, Text } from "react-native";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { Header } from "../../components/Header";
import { Button } from "react-native-paper";

export interface ICategoriesScreenProps {
    route: BaseRoute;
    jumpTo: (key: string) => void;
}

export const CategoriesScreen: FC = (): JSX.Element => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View>
      <Header navigation={navigation} />
      <Button mode="outlined">
        Категории
      </Button>
    </View>
  );
};