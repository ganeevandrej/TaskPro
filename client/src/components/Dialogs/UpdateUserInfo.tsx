import { Portal, Dialog } from "react-native-paper";
import { View } from "react-native";
import { FormUpdateUserInfo } from "../Forms/UpdateUserInfo";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogUpdateUserInfo: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const hideDialog = async () => {
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Редактирование данных</Dialog.Title>
          <Dialog.Content>
            <FormUpdateUserInfo hideDialog={hideDialog} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};