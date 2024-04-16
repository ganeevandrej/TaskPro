import { FC } from "react";
import { View, Text } from "react-native";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";

export interface ICategoriesScreenProps {
    route: BaseRoute;
    jumpTo: (key: string) => void;
}

export const CategoriesScreen: FC = (): JSX.Element => {
  return (
    <View>
        <Text>Категории</Text>
    </View>
  );
};