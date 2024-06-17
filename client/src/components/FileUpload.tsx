import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, IconButton, useTheme as useThemePaper } from "react-native-paper";
import { useAppSelector } from "../hooks/redux";
import { DialogUploadAvatar } from "./Dialogs/UploadAvatar";
import { useTheme } from "../contexts/theme-context";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export const ImagePickerExample = () => {
  const { avatar, user } = useAppSelector((state) => state.authReducer);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const {isThemeDark} = useTheme();
  const { colors } = useThemePaper();
  const styles = createStyles(colors, isThemeDark);

  return (
    <View style={styles.container}>
      <View style={styles.containerAvatar}>
        <Avatar.Image
          style={{ backgroundColor: "transparent" }}
          size={150}
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/empty-avatar.jpg")
          }
        />
        <IconButton
          style={styles.icon}
          icon="camera"
          size={20}
          onPress={() => setVisibleDialog(true)}
        />
      </View>
      <DialogUploadAvatar
        visible={visibleDialog}
        setVisible={setVisibleDialog}
      />
    </View>
  );
};

const createStyles = (colors: MD3Colors, themeDark: boolean) => StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerAvatar: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 152,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: "auto",
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.primary,
  }
});
