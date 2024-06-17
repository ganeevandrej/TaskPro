import { Portal, Dialog } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { FormUpdateTask } from "../Forms/UpdateTask";
import { ITask } from "../../store/reducers/taskManager/TaskManagerSlice";

export interface IUpdateTaskProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
  categoryId?: number;
}

export const DialogUpdateTask: React.FC<IUpdateTaskProps> = ({
  visible,
  setVisible,
  task,
  categoryId
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
            <FormUpdateTask category={categoryId} hideDialog={hideDialog} task={task} />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});