import { Portal, Dialog } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { FormUpdateTask } from "../Forms/UpdateTask";
import { ITask } from "../../store/reducers/taskManager/TaskManagerSlice";
import { ITaskTechnique } from "../../store/reducers/techniques/TechniquesSlice";
import { FormUpdateTaskTechnique } from "../Forms/UpdateTaskTechnique";

export interface IUpdateTaskProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITaskTechnique;
  technique: string
}

export const DialogUpdateTaskTechnique: React.FC<IUpdateTaskProps> = ({
  visible,
  setVisible,
  task,
  technique
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
              <FormUpdateTaskTechnique
                hideDialog={hideDialog}
                task={task}
                technique={technique}
              />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});
