import { Portal, Dialog } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { FormCreateTask } from "../Forms/CreateTask";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogCreateTask: React.FC<IVerificationProps> = ({
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
          <Dialog.Title>Создание задачи</Dialog.Title>
          <Dialog.Content>
            <ScrollView>
            <FormCreateTask hideDialog={hideDialog} />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});