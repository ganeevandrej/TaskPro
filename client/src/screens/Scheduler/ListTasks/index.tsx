import { FlatList, View } from "react-native";
import { List, Text } from "react-native-paper";
import { useState } from "react";
import { DialogDetalsTask } from "../../../components/Dialogs/DetalsTask";
import { DialogUpdateTask } from "../../../components/Dialogs/UpdateTask";
import { ITask } from "../../../store/reducers/taskManager/TaskManagerSlice";
import { Task } from "./Task";

export const initialTask: ITask = {
  id: 0,
  deadline: new Date(),
  name: "",
  status: "",
  category: "",
  priority: "",
};

interface IListTasks {
  tasks: ITask[];
  marginTop: number;
  categoryId?: number
}

export const ListTasks: React.FC<IListTasks> = ({
  tasks,
  marginTop,
  categoryId
}): React.JSX.Element => {
  const [task, setTask] = useState(initialTask);
  const [visibleDialogDetalsTask, setVisibleDialogDetalsTask] =
    useState<boolean>(false);
  const [visibleDialogUpdateTask, setVisibleDialogUpdateTask] =
    useState<boolean>(false);

  const openDialogDetalsTask = (task: ITask) => {
    setTask(task);
    setVisibleDialogDetalsTask(true);
  };

  const openDialogUpdateTask = (task: ITask) => {
    setTask(task);
    setVisibleDialogUpdateTask(true);
  };

  const renderItem = ({ item }: { item: ITask }) => (
    <Task
      item={item}
      onPressCard={openDialogDetalsTask}
      onPressIcon={openDialogUpdateTask}
    />
  );

  return (
    <>
      <List.Section style={{ marginTop: 0 }}>
        <List.Subheader style={{ marginTop: -10 }}>Задачи</List.Subheader>
        {tasks.length === 0 ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: marginTop,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text variant="titleSmall">Список пуст. Добавьте задачи!</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          />
        )}
      </List.Section>
      <DialogDetalsTask
        visible={visibleDialogDetalsTask}
        setVisible={setVisibleDialogDetalsTask}
        task={task}
      />
      <DialogUpdateTask
        visible={visibleDialogUpdateTask}
        setVisible={setVisibleDialogUpdateTask}
        task={task}
        categoryId={categoryId}
      />
    </>
  );
};
