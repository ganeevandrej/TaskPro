import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { DialogCreateTask } from "../../../components/Dialogs/CreateTask";
import { useState } from "react";

export const ShedulerFAB = () => {
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
