import {
  Portal,
  Dialog,
  List,
  Button,
  Text,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks/redux";
import { ITaskTechnique } from "../../store/reducers/techniques/TechniquesSlice";
import {
  completeTaskTechniques,
  deleteTaskFlog,
  deleteTaskMetchod,
  deleteTaskPomodoro,
} from "../../store/reducers/techniques/ActionCreators";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITaskTechnique;
}

export const DialogDetalsTaskTechnique: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
  task,
}): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const hideDialog = async () => {
    setVisible(false);
  };

  const deleteTask = () => {
    if (task.technique === "Eat That Flog") {
      dispatch(deleteTaskFlog(task.id));
    }
    if (task.technique === "Pomodoro") {
      dispatch(deleteTaskPomodoro(task.id));
    }
    if (task.technique === "Method") {
      dispatch(deleteTaskMetchod(task.id));
    }

    setVisible(false);
  };

  const completeTask = () => {
    dispatch(completeTaskTechniques(task.id));
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{ paddingVertical: 0 }}>
            {task.title}
          </Dialog.Title>
          <Dialog.Content style={{ marginVertical: 0 }}>
            <List.Section>
              <List.Subheader style={{ paddingHorizontal: 0, paddingTop: 0 }}>
                Детали задачи
              </List.Subheader>
              <View
                style={{
                  backgroundColor: colors.secondaryContainer,
                  marginBottom: 5,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <List.Item
                  titleStyle={{ fontSize: 14 }}
                  title="Категория"
                  left={(props) => (
                    <List.Icon {...props} icon="folder-google-drive" />
                  )}
                  right={(props) => (
                    <Text variant="bodyMedium" {...props}>
                      {task.technique}
                    </Text>
                  )}
                />
              </View>
              <View
                style={{
                  backgroundColor: colors.secondaryContainer,
                  marginBottom: 5,
                }}
              >
                <List.Item
                  titleStyle={{ fontSize: 14, marginBottom: 5 }}
                  title="Приоритет"
                  left={(props) => (
                    <List.Icon {...props} icon="rhombus-medium" />
                  )}
                  right={(props) => (
                    <Text
                      style={{ marginBottom: 5 }}
                      variant="bodyMedium"
                      {...props}
                    >
                      {task.priority ? task.priority : "-"}
                    </Text>
                  )}
                />
              </View>
              <View
                style={{
                  backgroundColor: colors.secondaryContainer,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <List.Item
                  titleStyle={{ fontSize: 14 }}
                  title="Статус"
                  left={(props) => <List.Icon {...props} icon="scent" />}
                  right={(props) => (
                    <Text variant="bodyMedium" {...props}>
                      {task.status}
                    </Text>
                  )}
                />
              </View>
            </List.Section>
            <List.Section>
              <List.Subheader style={{ paddingHorizontal: 0, paddingTop: 0 }}>
                Дедлайн
              </List.Subheader>
              <View
                style={{
                  backgroundColor: colors.secondaryContainer,
                  marginBottom: 5,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <List.Item
                  titleStyle={{ fontSize: 14 }}
                  title="Дата"
                  left={(props) => (
                    <List.Icon {...props} icon="calendar-today" />
                  )}
                  right={(props) => (
                    <Text variant="bodyMedium" {...props}>
                      {task.deadline ? dateToString(task.deadline) : ""}
                    </Text>
                  )}
                />
              </View>
              <View
                style={{
                  backgroundColor: colors.secondaryContainer,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <List.Item
                  titleStyle={{ fontSize: 14 }}
                  title="Время"
                  left={(props) => (
                    <List.Icon {...props} icon="clock-time-four-outline" />
                  )}
                  right={(props) => (
                    <Text variant="bodyMedium" {...props}>
                      {task.deadline ? timeToString(task.deadline) : ""}
                    </Text>
                  )}
                />
              </View>
            </List.Section>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Назад</Button>
            <Button onPress={() => deleteTask()}>Удалить</Button>
            <Button
              disabled={
                task.status === "Завершена" || task.status === "Просрочена"
              }
              onPress={() => completeTask()}
            >
              Завершить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export const dateToString = (date: Date) => {
  const dateToDate = new Date(date);

  return dateToDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const timeToString = (date: Date) => {
  const dateToDate = new Date(date);

  return dateToDate.toLocaleTimeString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });
};

const styles = StyleSheet.create({});
