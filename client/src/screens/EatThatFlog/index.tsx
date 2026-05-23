import { FC, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Card, IconButton, List, ProgressBar, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { CustomStatusBar } from "../../components/custom/StatusBar";
import { CustomButton } from "../../components/custom/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getTaskTechniques } from "../../store/reducers/techniques/ActionCreators";
import { DialogUpdateTaskTechnique } from "../../components/Dialogs/UpdateTaskTechnique";
import { DialogDetalsTaskTechnique } from "../../components/Dialogs/DetalsTaskTechnique";
import { DialogCreateTaskTechnique } from "../../components/Dialogs/CreateTaskTechnique";
import { renderIconStatus } from "../Scheduler/ListTasks/Task";

export const EatThatFlogScreen: FC = (): JSX.Element => {
  const [progress, setProgress] = useState<number>(0.2);
  const { user } = useAppSelector((state) => state.authReducer);
  const taskFlog = useAppSelector(
    (state) => state.techniquesManagerReducer.taskFlog
  );
  const [visibleDialogUpdateTask, setVisibleDialogUpdateTask] =
    useState<boolean>(false);
  const [visibleDialogDetalsTask, setVisibleDialogDetalsTask] =
    useState<boolean>(false);
  const [visibleDialogCreateTask, setVisibleDialogCreateTask] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTaskTechniques({ userId: user.id, technique: "Eat That Flog" }));
  }, []);

  const openDialogUpdateTask = () => {
    setVisibleDialogUpdateTask(true);
  };

  const openDialogDetalsTask = () => {
    setVisibleDialogDetalsTask(true);
  };

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
        source={require("../../../assets/eatThatFrog.png")}
      />
      <View  style={{marginBottom: 10}}>
        <Text
          style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
          variant="titleMedium"
        >
          Добро пожаловать в раздел, посвящённый технике Eat That Flog!
        </Text>
        <List.Section>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Основная идея
          </List.Subheader>
          <Card key="1" style={{ width: "90%", marginLeft: 20 }}>
            <Card.Content>
              <Text
                style={{ textAlign: "justify", marginTop: -8 }}
                variant="bodyMedium"
              >
                Заключается в том, чтобы начинать день с выполнения самой
                сложной и важной задачи.
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
                  title="1 Шаг. Определите свою «лягушку»"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Выберите самую важную и трудную задачу на день — это ваша
                    "лягушка".
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
                    P.S. Выберите крупную задачу, созданную в разделе о технике
                    "1-3-5 Method"
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="2"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="2 Шаг. Планирование «лягушки»"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    На кануне вечером или утром составьте список задач на день и
                    спланируйте свою "лягушку".
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
                    P.S. Для этого можете воспользоваться разделом о технике
                    "1-3-5 Method".
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="3"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="3 Шаг. Выполнение «лягушки»"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Сразу после пробуждения и выполнения утренних рутин начните
                    работу с выполнения самой важной задачи.
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
                    P.S. Сосредоточьтесь на ней, пока она не будет завершена
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="4"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="4 Шаг. Избегайте отвлеканий"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Во процессе выполнения «лягушки» избегайте отвлекающих
                    факторов.
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
                    P.S. Для эффективного выполнения «лягушки» воспользуйтесь
                    разделом о технике "Pomodoro".
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="5"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="5 Шаг. Завершение «лягушки»"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    После завершения задачи отметьте её как завершенную. Затем
                    приступайте к выполнению менее крупных задач.
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
                    P.S. Не забывайте отдыхать между задачами. Делайте перерывы
                    в 30-45м.
                  </Text>
                </Card.Content>
              </Card>
            </PagerView>
            <View style={{ marginTop: 10, width: "50%", alignSelf: "center" }}>
              <ProgressBar progress={progress} />
            </View>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Лягушка
          </List.Subheader>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {taskFlog.id ? (
              <Card
                style={{ width: "90%" }}
                onPress={() => openDialogDetalsTask()}
              >
                <Card.Title
                  style={{ marginRight: 5 }}
                  title={taskFlog.title}
                  right={() => (
                    <IconButton
                      icon="square-edit-outline"
                      onPress={() => openDialogUpdateTask()}
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
                      <List.Icon
                        {...props}
                        icon={renderIconStatus(taskFlog.status)}
                      />
                    )}
                    right={(props) => <Text {...props}>{taskFlog.status}</Text>}
                  />
                </Card.Content>
              </Card>
            ) : (
              <CustomButton
                title="Добавить задачу"
                callback={() => setVisibleDialogCreateTask(true)}
              />
            )}
          </View>
        </List.Section>
        <DialogUpdateTaskTechnique
          visible={visibleDialogUpdateTask}
          setVisible={setVisibleDialogUpdateTask}
          task={taskFlog}
          technique="Eat That Flog"
        />
        <DialogDetalsTaskTechnique
          visible={visibleDialogDetalsTask}
          setVisible={setVisibleDialogDetalsTask}
          task={taskFlog}
        />
        <DialogCreateTaskTechnique
          visible={visibleDialogCreateTask}
          setVisible={setVisibleDialogCreateTask}
          technique="Eat That Flog"
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
