import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAvatar } from "../store/reducers/auth/ActionCreators";
import { DialogUploadAvatar } from "./Dialogs/UploadAvatar";

export const ImagePickerExample = () => {
  const dispatch = useAppDispatch();
  const { avatar, user, isLoading } = useAppSelector(
    (state) => state.authReducer
  );
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAvatar(user.id));
  }, []);

  if (isLoading) {
    return <Text>loading ...</Text>;
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          width: 154,
          borderRadius: 80,
          borderWidth: 2,
          borderColor: "yellow",
          marginHorizontal: "auto",
        }}
      >
        <Avatar.Image
          style={{ backgroundColor: "transparent" }}
          size={150}
          source={
            avatar ? { uri: avatar } : require("../../assets/empty-avatar.jpg")
          }
        />
        <IconButton
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "yellow",
          }}
          icon="camera"
          size={20}
          onPress={() => setVisibleDialog(true)}
        />
      </View>
      <DialogUploadAvatar visible={visibleDialog} setVisible={setVisibleDialog} />
    </View>
  );
};
