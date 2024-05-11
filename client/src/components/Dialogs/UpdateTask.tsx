import { Portal, Dialog } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { FormUpdateTask } from "../Forms/UpdateTask";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number
}

export const DialogUpdateTask: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
  taskId
}): React.JSX.Element => {
  const hideDialog = async () => {
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Редактирование задачи</Dialog.Title>
          <Dialog.Content>
            <ScrollView>
            <FormUpdateTask hideDialog={hideDialog} taskId={taskId} />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});