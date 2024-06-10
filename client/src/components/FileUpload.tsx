import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useAppSelector } from "../hooks/redux";
import { DialogUploadAvatar } from "./Dialogs/UploadAvatar";

export const ImagePickerExample = () => {
  const { avatar, user } = useAppSelector((state) => state.authReducer);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);

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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerAvatar: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 154,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "yellow",
    marginHorizontal: "auto",
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "yellow",
  }
});
