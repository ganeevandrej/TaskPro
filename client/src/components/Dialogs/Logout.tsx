import { Portal, Dialog, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { FormCreateCategory } from "../Forms/CreateCategory";
import { CustomButton } from "../custom/Button";
import { fetchLogout } from "../../store/reducers/auth/ActionCreators";
import { useAppDispatch } from "../../hooks/redux";

export interface IDialogLogoutProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogLogout: React.FC<IDialogLogoutProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const hideDialog = async () => {
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{ paddingVertical: 0 }}>
            Выход
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="titleMedium">Вы действительно хотите выйти?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <CustomButton title="Отмена" callback={() => hideDialog()} />
            <CustomButton title="Выйти" callback={() => dispatch(fetchLogout())} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});
