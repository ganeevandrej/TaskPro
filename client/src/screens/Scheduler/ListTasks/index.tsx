import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { useAppSelector } from "../../../hooks/redux";
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
  tasks: ITask[]
}

export const ListTasks: React.FC<IListTasks> = ({tasks}): React.JSX.Element => {
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
      <List.Section>
        <List.Subheader>Задачи</List.Subheader>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
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
      />
    </>
  );
};
