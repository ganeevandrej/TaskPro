import { FC, useEffect, useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import PagerView from "react-native-pager-view";
import {
  List,
  Text,
  Card,
  ProgressBar,
  IconButton,
  Button,
} from "react-native-paper";
import { CustomButton } from "../../components/custom/Button";
import { CustomStatusBar } from "../../components/custom/StatusBar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getTasksMethod } from "../../store/reducers/techniques/ActionCreators";
import { DialogUpdateTaskTechnique } from "../../components/Dialogs/UpdateTaskTechnique";
import { DialogDetalsTaskTechnique } from "../../components/Dialogs/DetalsTaskTechnique";
import { DialogCreateTaskTechnique } from "../../components/Dialogs/CreateTaskTechnique";
import { ITaskTechnique } from "../../store/reducers/techniques/TechniquesSlice";
import { renderIconStatus } from "../Scheduler/ListTasks/Task";

interface ITaskProps {
  task: ITaskTechnique;
  openDialogDetails: (task: ITaskTechnique) => void;
  openDialogUpdate: (task: ITaskTechnique) => void;
}

export const Task: React.FC<ITaskProps> = ({
  task,
  openDialogDetails,
  openDialogUpdate,
}) => {
  return (
    <Card
      style={{ alignSelf: "center", width: "92%", marginBottom: 10 }}
      onPress={() => openDialogDetails(task)}
    >
      <Card.Title
        style={{ marginRight: 5 }}
        title={task.title}
        right={() => (
          <IconButton
            icon="square-edit-outline"
            onPress={() => openDialogUpdate(task)}
          />
        )}
      />
      <Card.Content style={{}}>
        <List.Item
          style={{
            marginHorizontal: -17,
            marginTop: -5,
            marginBottom: -10,
          }}
          titleStyle={{ fontSize: 14 }}
          title="Статус"
          left={(props) => (
            <List.Icon {...props} icon={renderIconStatus(task.status)} />
          )}
          right={(props) => <Text {...props}>{task.status}</Text>}
        />
      </Card.Content>
    </Card>
  );
};

export const MethodScreen: FC = (): JSX.Element => {
  const [progress, setProgress] = useState<number>(0.2);
  const [initialTask, setInitialTask] = useState<ITaskTechnique>(
    {} as ITaskTechnique
  );
  const { user } = useAppSelector((state) => state.authReducer);
  const tasks = useAppSelector((state) => state.techniquesManagerReducer.tasks);
  const [visibleDialogUpdateTask, setVisibleDialogUpdateTask] =
    useState<boolean>(false);
  const [visibleDialogDetalsTask, setVisibleDialogDetalsTask] =
    useState<boolean>(false);
  const [visibleDialogCreateTaskOne, setVisibleDialogCreateTaskOne] =
    useState<boolean>(false);
  const [visibleDialogCreateTaskSecond, setVisibleDialogCreateTaskSecond] =
    useState<boolean>(false);
  const [visibleDialogCreateTaskThird, setVisibleDialogCreateTaskThird] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksMethod({ userId: user.id, technique: "Method" }));
  }, []);

  const openDialogDetails = (task: ITaskTechnique) => {
    setInitialTask(task);
    setVisibleDialogDetalsTask(true);
  };

  const openDialogUpdate = (task: ITaskTechnique) => {
    setInitialTask(task);
    setVisibleDialogUpdateTask(true);
  };

  const largeTask: ITaskTechnique | undefined = tasks.find(
    (task) => task.priority === "Высокий"
  );
  const mediumTasks: ITaskTechnique[] | undefined = tasks.filter(
    (task) => task.priority === "Средний"
  );
  const smallTasks: ITaskTechnique[] | undefined = tasks.filter(
    (task) => task.priority === "Низкий"
  );

  const renderItem = ({ item }: { item: ITaskTechnique }) => (
    <Task
      task={item}
      openDialogDetails={openDialogDetails}
      openDialogUpdate={openDialogUpdate}
    />
  );

  const textMedium = mediumTasks.length ? `(${mediumTasks.length} из 3)` : "";
  const textSmall = smallTasks.length ? `(${smallTasks.length} из 5)` : "";

  const onPageScroll = (e: any) => {
    switch (e.nativeEvent.position) {
      case 0:
        return setProgress(0.2);
      case 1:
        return setProgress(0.4);
      case 2:
        return setProgress(0.6);
      case 3:
        return setProgress(0.8);
      case 4:
        return setProgress(1);
      default:
        return setProgress(0.2);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <CustomStatusBar />
      <Image
        style={{ width: "100%", height: 200 }}
        source={require("../../../assets/1-2-3-4.jpg")}
      />
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
          variant="titleMedium"
        >
          Добро пожаловать в раздел, посвящённый технике 1-3-5 Method!
        </Text>
        <List.Section>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Основная идея
          </List.Subheader>
          <Card style={{ width: "90%", marginLeft: 20 }}>
            <Card.Content style={{ marginTop: -8 }}>
              <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                Обеспечить правильный баланс между крупными и мелкими делами в
                течение дня. Следуя этому простому принципу, вы сможете лучше
                организовать своё время и повысить продуктивность.
              </Text>
            </Card.Content>
          </Card>
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Инструция
          </List.Subheader>
          <View style={{ flexDirection: "column" }}>
            <PagerView
              style={styles.container}
              onPageSelected={onPageScroll}
              initialPage={0}
              overdrag={true}
            >
              <Card
                key="1"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="1 Шаг. Установите 1 крупную задачу"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Выберите одну основную задачу на день, которая требует
                    значительных усилий и времени.
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#808080",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    variant="bodySmall"
                  >
                    P.S. Это самая важная задача, которую нужно обязательно
                    выполнить
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="2"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="2 Шаг. Выберите 3 средних задачи"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Определите 3 задачи среднего размера. Они тоже важны, но не
                    столь масштабны, как основная задача.
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#808080",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    variant="bodySmall"
                  >
                    P.S. Они должны дополнять ваш день и продвигать вас к вашим
                    целям.
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="3"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="3 Шаг. Определите 5 мелких задач"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="titleSmall">
                    Определите 5 небольших задач, которые являются менее важными
                    делами, например рутинные.
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#808080",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    variant="bodySmall"
                  >
                    P.S. Эти задачи должны быть короткими и не требовать много
                    времени
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="4"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="4 Шаг. Распределите задачи"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Начните с выполнения крупной задачи, затем переходите к
                    средним и завершайте мелкими.
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#808080",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    variant="bodySmall"
                  >
                    P.S. Советуем зайти в раздел техники "Eat That Frog!".
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="5"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="5 Шаг. Завершайте задачи"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    По мере выполнения задач отмечайте их как завершённые.
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#808080",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                    variant="bodySmall"
                  >
                    P.S. Это позволит вам видеть свой прогресс и поддерживать
                    мотивацию.
                  </Text>
                </Card.Content>
              </Card>
            </PagerView>
            <View style={{ marginTop: 10, width: "50%", alignSelf: "center" }}>
              <ProgressBar progress={progress} />
            </View>
          </View>
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader>
            <Text>Крупная Задача</Text>
          </List.Subheader>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {largeTask ? (
              <Task
                task={largeTask}
                openDialogDetails={openDialogDetails}
                openDialogUpdate={openDialogUpdate}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text variant="bodyMedium">Список пуст.</Text>
                <CustomButton
                  title="Добавьте задачу"
                  callback={() => setVisibleDialogCreateTaskOne(true)}
                />
              </View>
            )}
          </View>
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader style={{ marginTop: -10 }}>
            <Text>Средние Задачи{textMedium}</Text>
          </List.Subheader>
          <View>
            {mediumTasks?.length ? (
              <>
                {mediumTasks.map((item) => (
                  <Task
                    key={item.id}
                    task={item}
                    openDialogDetails={openDialogDetails}
                    openDialogUpdate={openDialogUpdate}
                  />
                ))}
                {mediumTasks?.length !== 3 && (
                  <Button
                    style={{ alignSelf: "center" }}
                    mode="text"
                    onPress={() => setVisibleDialogCreateTaskSecond(true)}
                  >
                    Добавить еще
                  </Button>
                )}
              </>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text variant="bodyMedium">Список пуст.</Text>
                <CustomButton
                  title="Добавьте задачи"
                  callback={() => setVisibleDialogCreateTaskSecond(true)}
                />
              </View>
            )}
          </View>
        </List.Section>
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader style={{ marginTop: -10 }}>
            <Text>Мелкие Задачи{textSmall}</Text>
          </List.Subheader>
          <View>
            {smallTasks?.length ? (
              <>
                {mediumTasks.map((item) => (
                  <Task
                    key={item.id}
                    task={item}
                    openDialogDetails={openDialogDetails}
                    openDialogUpdate={openDialogUpdate}
                  />
                ))}
                {smallTasks?.length !== 5 && (
                  <Button
                    style={{ alignSelf: "center" }}
                    mode="text"
                    onPress={() => setVisibleDialogCreateTaskThird(true)}
                  >
                    Добавить еще
                  </Button>
                )}
              </>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text variant="bodyMedium">Список пуст.</Text>
                <CustomButton
                  title="Добавьте задачи"
                  callback={() => setVisibleDialogCreateTaskThird(true)}
                />
              </View>
            )}
          </View>
        </List.Section>
        <DialogUpdateTaskTechnique
          visible={visibleDialogUpdateTask}
          setVisible={setVisibleDialogUpdateTask}
          task={initialTask}
          technique="Method"
        />
        <DialogDetalsTaskTechnique
          visible={visibleDialogDetalsTask}
          setVisible={setVisibleDialogDetalsTask}
          task={initialTask}
        />
        <DialogCreateTaskTechnique
          visible={visibleDialogCreateTaskThird}
          setVisible={setVisibleDialogCreateTaskThird}
          technique="Method"
          priority={1}
        />
        <DialogCreateTaskTechnique
          visible={visibleDialogCreateTaskSecond}
          setVisible={setVisibleDialogCreateTaskSecond}
          technique="Method"
          priority={2}
        />
        <DialogCreateTaskTechnique
          visible={visibleDialogCreateTaskOne}
          setVisible={setVisibleDialogCreateTaskOne}
          technique="Method"
          priority={3}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 170,
    paddingBottom: 10,
  },
});
