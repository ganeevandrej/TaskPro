import { Appbar } from "react-native-paper";
import { DrawerParamList } from "../NavigationContaners/DrawerContainer";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useRoute } from "@react-navigation/native";

interface HeaderProps {
    navigation: DrawerNavigationProp<DrawerParamList>,
}

export const Header: React.FC<HeaderProps> = ({navigation}): React.JSX.Element => {
    const route = useRoute();

    return (
        <>
        <Appbar>
            <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
            <Appbar.Content
                title={route.name}
                titleStyle={{ textAlign: "center" }} />
        </Appbar>
        </>
    );
}