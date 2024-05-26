import { Portal, Dialog } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { FormCreateCategory } from "../Forms/CreateCategory";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogCreateCategory: React.FC<IVerificationProps> = ({
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
          <Dialog.Title style={{ paddingVertical: 0 }}>
            Создайте Категорию
          </Dialog.Title>
          <Dialog.Content>
            <FormCreateCategory hideDialog={hideDialog} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});
