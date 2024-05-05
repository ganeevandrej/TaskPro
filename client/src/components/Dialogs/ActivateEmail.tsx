import { Text, Button, Portal, Dialog } from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Verification } from "../custom/verification";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchActivate, fetchSendLetter } from "../../store/reducers/auth/ActionCreators";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogActivateEmail: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const [code, setCode] = useState("");
  const {id} = useAppSelector(state => state.authReducer.user)
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const hideDialog = async () => {
    dispatch(fetchActivate(code));
    setVisible(false);
    setCode("");
  };

  const sendLetterByEmail = async () => {
    dispatch(fetchSendLetter(id));
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Подтвердите почту</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              При регистрации аккаунта на вашу почту был отправлен 6-ти значный
              код.
            </Text>
            <Verification value={code} setValue={setCode} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={sendLetterByEmail}>
              Отправить письмо
            </Button>
            <Button mode="contained" onPress={hideDialog}>
              Подтвердить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});
