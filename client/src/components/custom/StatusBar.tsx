import { useTheme as useThemeNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useTheme } from "../../contexts/theme-context";

export const CustomStatusBar = () => {
    const {colors} = useThemeNavigation();
    const {isThemeDark} = useTheme();
    return (
        <StatusBar barStyle={!isThemeDark ? "dark-content" : "light-content"} backgroundColor={colors.card} />
    );
}