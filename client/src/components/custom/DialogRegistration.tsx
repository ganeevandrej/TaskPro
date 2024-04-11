import { Text, Button, Portal, Dialog } from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Verification } from "./verification";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogRegistration: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const [code, setCode] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const hideDialog = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.67:5000/api/activate/${code}`
      );
      setVisible(false);
      // setCode("");
      // navigation.navigate("Scheduler");
    } catch (error) {
      const e = error as Error;
    }
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Подтвердите почту</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              На вашу почту был отправлен 6-ти значный код.
            </Text>
            <Verification value={code} setValue={setCode} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={hideDialog}>
              Отправить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});
