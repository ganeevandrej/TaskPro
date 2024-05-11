import {
  Text,
  Portal,
  Dialog,
  TouchableRipple,
  Icon,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteAvatarFromDb,
  sendAvatarToBackend,
} from "../../store/reducers/auth/ActionCreators";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogUploadAvatar: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const { id } = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const hideDialog = async () => {
    setVisible(false);
  };

  const sendToBackend = async (uri: string) => {
    dispatch(sendAvatarToBackend({ uriImage: uri, userId: id }));
    setVisible(false);
  };

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
          await sendToBackend(result.assets[0].uri);
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
          await sendToBackend(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAvatar = async () => {
    dispatch(deleteAvatarFromDb(id));
    setVisible(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Загрузите Аватарку</Dialog.Title>
        <Dialog.Content
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <TouchableRipple onPress={() => uploadImage()}>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 15,
                borderRadius: 10,
                paddingVertical: 15,
                backgroundColor: colors.secondaryContainer,
              }}
            >
              <Icon source="camera" color={colors.onSurfaceVariant} size={30} />
              <Text style={{ width: 50, fontSize: 12 }}>Камера</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => uploadImage("gallery")}>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 15,
                borderRadius: 10,
                paddingVertical: 15,
                backgroundColor: colors.secondaryContainer,
              }}
            >
              <Icon source="image" color={colors.onSurfaceVariant} size={30} />
              <Text style={{ width: 60, fontSize: 12 }}>Галлерея</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => deleteAvatar()}>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 15,
                borderRadius: 10,
                paddingVertical: 15,
                backgroundColor: colors.secondaryContainer,
              }}
            >
              <Icon source="delete" color={colors.onSurfaceVariant} size={30} />
              <Text style={{ width: 60, fontSize: 12 }}>Удалить</Text>
            </View>
          </TouchableRipple>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({});
