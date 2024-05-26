import { Text, Button, Portal, Dialog } from "react-native-paper";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Verification } from "../custom/verification";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchActivate,
  fetchSendLetter,
} from "../../store/reducers/auth/ActionCreators";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogActivateEmail: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const [code, setCode] = useState("");
  const { id } = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();

  const hideDialog = async () => {
    setVisible(false);
  };

  const activateCode = async () => {
    dispatch(fetchActivate(code));
    setCode("");
    hideDialog();
  };

  const sendLetterByEmail = async () => {
    dispatch(fetchSendLetter(id));
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
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
          <Button mode="contained" onPress={activateCode}>
            Подтвердить
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({});
