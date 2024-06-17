import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { StyleSheet } from "react-native";
import { styles } from "../Filters/styles";

export const createStyles = (colors: MD3Colors) =>
    StyleSheet.create({
        containerTimeInput: {
            borderRadius: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: colors.secondaryContainer,
            marginTop: 5,
        },
        containerDateInput: {
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: colors.secondaryContainer,
        },
        btnContainer: {
            ...styles.btnContainer
        },
        containerSelects: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
        },
    });