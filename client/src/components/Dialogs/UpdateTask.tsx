import { Portal, Dialog } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { FormUpdateTask } from "../Forms/UpdateTask";
import { ITask } from "../../store/reducers/taskManager/TaskManagerSlice";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask
}

export const DialogUpdateTask: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
  task
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
            <FormUpdateTask hideDialog={hideDialog} task={task} />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});