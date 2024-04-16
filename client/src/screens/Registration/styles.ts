import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const width_2 = width - 80;

export const styles = StyleSheet.create({
    container: {
      width: width_2,
      marginHorizontal: 40,
      // marginTop: "50%",
    },
    link: {
      textDecorationLine: "underline",
      textAlign: "center",
      marginTop: 20,
    },
  });
