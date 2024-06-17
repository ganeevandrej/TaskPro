import { Portal, Dialog } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { FormCreateTask } from "../Forms/CreateTask/CreateTask";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId?: number;
}

export const DialogCreateTask: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
  categoryId
}): React.JSX.Element => {
  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Создание задачи</Dialog.Title>
          <Dialog.Content>
            <ScrollView>
              <FormCreateTask hideDialog={hideDialog} category={categoryId} />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};
