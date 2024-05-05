import { Text, Button, Portal, Dialog } from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Verification } from "../custom/verification";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { FormUpdateUserInfo } from "../Forms/UpdateUserInfo";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogUpdateUserInfo: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());

  const hideDialog = async () => {
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Персональные данные</Dialog.Title>
          <Dialog.Content>
            <FormUpdateUserInfo hideDialog={hideDialog} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};