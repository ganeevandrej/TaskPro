import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Avatar,
  Text as TextPaper,
  Card,
  Icon,
  IconButton,
  Modal,
  Portal,
  TouchableRipple,
} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  deleteAvatarFromDb,
  getAvatar,
  sendAvatarToBackend,
} from "../store/reducers/auth/ActionCreators";

export const ImagePickerExample = () => {
  const dispatch = useAppDispatch();
  const { avatar, user, isLoading } = useAppSelector(
    (state) => state.authReducer
  );
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const getUserAvatar = async () => {
      dispatch(getAvatar(user.id));
    };
    
    getUserAvatar();
  }, []);

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

  const sendToBackend = async (uri: string) => {
    dispatch(sendAvatarToBackend({ uriImage: uri, userId: user.id }));
    setVisible(false);
  };

  const deleteAvatar = async () => {
    dispatch(deleteAvatarFromDb(user.id));
    setVisible(false);
  };

  if (isLoading) {
    return <Text>loading ...</Text>;
  }

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Avatar.Image
          size={150}
          source={
            avatar ? { uri: avatar } : require("../../assets/empty-avatar.jpg")
          }
        />
        <IconButton
          style={{
            position: "absolute",
            bottom: 0,
            right: 100,
            backgroundColor: "white",
          }}
          icon="camera"
          size={20}
          onPress={() => setVisible(true)}
        />
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextPaper variant="titleLarge">Загрузите Аватарку</TextPaper>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <Card>
                  <Card.Content>
                    <TouchableRipple
                      style={{ borderRadius: 50 }}
                      onPress={() => uploadImage()}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon source="camera" size={30} />
                        <Text style={{ width: 50, fontSize: 12 }}>Камера</Text>
                      </View>
                    </TouchableRipple>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <TouchableRipple
                      style={{ borderRadius: 50 }}
                      onPress={() => uploadImage("gallery")}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon source="image" size={30} />
                        <Text style={{ width: 60, fontSize: 12 }}>
                          Галлерея
                        </Text>
                      </View>
                    </TouchableRipple>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <TouchableRipple
                      style={{ borderRadius: 50 }}
                      onPress={() => deleteAvatar()}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Icon source="delete" size={30} />
                        <Text style={{ width: 60, fontSize: 12 }}>Удалить</Text>
                      </View>
                    </TouchableRipple>
                  </Card.Content>
                </Card>
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
