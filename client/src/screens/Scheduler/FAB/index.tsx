import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { DialogCreateTask } from "../../../components/Dialogs/CreateTask";
import { useState } from "react";

interface IShedulerFABProps {
  categoryId?: number;
}

export const ShedulerFAB: React.FC<IShedulerFABProps> = ({categoryId}) => {
  const [visibleDialogCreateTask, setVisibleDialogCreateTask] =
    useState<boolean>(false);

  return (
    <>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setVisibleDialogCreateTask(true)}
      />
      <DialogCreateTask
        visible={visibleDialogCreateTask}
        setVisible={setVisibleDialogCreateTask}
        categoryId={categoryId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
});
