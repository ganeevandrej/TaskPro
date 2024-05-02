import { useState } from "react";
import { View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button, Modal, Portal } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUserAvatar } from "../store/reducers/auth/ActionCreators";

export const ImagePickerExample = () => {
  const dispatch = useAppDispatch();
  const { avatar, user, isLoading } = useAppSelector((state) => state.authReducer);
  const [visible, setVisible] = useState<boolean>(false);

  const uploadImage = async (mode: string = "") => {
    try {
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          await saveImage(blob);
        }
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        const result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          await saveImage(blob);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = async (blob: Blob) => {
    const formData = new FormData();
    console.log(user)
    const userId = String(user.id);

    formData.append("image", blob);
    formData.append("userId", userId);
    dispatch(setUserAvatar(formData));
    setVisible(false);
  };

  if(isLoading) {
    return <Text>loading ...</Text>
  }

  return (
    <View>
      <Button mode="outlined" onPress={() => setVisible(true)}>
        Загрузить автар
      </Button>
      <Avatar.Image
        size={200}
        source={
          avatar ? { uri: avatar } : require("../../assets/empty-avatar.jpg")
        }
      />
      <Text>{user.email ? user.email : "Черт"}</Text>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <Button mode="outlined" onPress={() => uploadImage()}>
            Камера
          </Button>
          <Button mode="outlined" onPress={() => uploadImage("gallery")}>
            Галлерея
          </Button>
          <Button mode="outlined" onPress={() => uploadImage()}>
            Удалить
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};
