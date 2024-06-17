import { Portal, Dialog } from "react-native-paper";
import { View, ScrollView, StyleSheet } from "react-native";
import { FormCreateTask } from "../Forms/CreateTask/CreateTask";
import { FormCreateTaskTechnique } from "../Forms/CreateTaskTechnique/CreateTaskTecnique";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  technique: string;
  priority?: number;
}

export const DialogCreateTaskTechnique: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
  technique,
  priority
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
              <FormCreateTaskTechnique priority={priority} hideDialog={hideDialog} technique={technique} />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};
