import { FC, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Card, IconButton, List, ProgressBar, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { CustomTimer } from "../../components/custom/Timer";
import { CustomStatusBar } from "../../components/custom/StatusBar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getTaskTechniques } from "../../store/reducers/techniques/ActionCreators";
import { DialogUpdateTaskTechnique } from "../../components/Dialogs/UpdateTaskTechnique";
import { DialogDetalsTaskTechnique } from "../../components/Dialogs/DetalsTaskTechnique";
import { DialogCreateTaskTechnique } from "../../components/Dialogs/CreateTaskTechnique";
import { CustomButton } from "../../components/custom/Button";
import { renderIconStatus } from "../Scheduler/ListTasks/Task";

export const PomodoroScreen: FC = (): JSX.Element => {
  const [progress, setProgress] = useState<number>(0.2);
  const { user } = useAppSelector((state) => state.authReducer);
  const taskPomodoro = useAppSelector(
    (state) => state.techniquesManagerReducer.taskPomodoro
  );
  const [visibleDialogUpdateTask, setVisibleDialogUpdateTask] =
    useState<boolean>(false);
  const [visibleDialogDetalsTask, setVisibleDialogDetalsTask] =
    useState<boolean>(false);
  const [visibleDialogCreateTask, setVisibleDialogCreateTask] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTaskTechniques({ userId: user.id, technique: "Pomodoro" }));
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
        source={require("../../../assets/pomodoro.jpg")}
      />
      <View  style={{marginBottom: 10}}>
        <Text
          style={{ textAlign: "center", marginHorizontal: 15, marginTop: 20 }}
          variant="titleMedium"
        >
          Добро пожаловать в раздел, посвящённый технике Pomodoro!
        </Text>
        <List.Section>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Основная идея
          </List.Subheader>
          <Card key="1" style={{ width: "90%", marginLeft: 20 }}>
            <Card.Content style={{marginTop: -8}}>
              <Text style={{ textAlign: "justify" }} variant="bodyMedium">
                Заключается в разделении работы на короткие, строго ограниченные
                временные интервалы, чередующиеся с небольшими перерывами.
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
                  title="1 Шаг. Выберите задачу"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Определите задачу, над которой собираетесь работать.
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
                    P.S. Выберите одну из задач, созданных в разделе техники
                    1-3-5 Method
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="2"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="2 Шаг. Установите таймер"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Этот период называется "помодоро". Выберите тихое и удобное
                    место, чтобы ничто не отвлекало вас от работы.
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
                    P.S. Таймер уже настроен
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="3"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="3 Шаг. Начинайте работать"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Полностью сосредоточьтесь на задаче. Не отвлекайтесь на
                    посторонние дела.
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
                    P.S. Работайте пока не истечёт таймер
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="4"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="4 Шаг. Сделайте короткий перерыв"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Когда таймер прозвенит, сделайте короткий перерыв.
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
                    P.S. Это поможет вам восстановить концентрацию.
                  </Text>
                </Card.Content>
              </Card>
              <Card
                key="5"
                style={{ width: "90%", marginLeft: 20, marginBottom: 5 }}
              >
                <Card.Title
                  titleVariant="titleMedium"
                  title="5 Шаг. Повторите цикл"
                />
                <Card.Content>
                  <Text style={{ marginTop: -8 }} variant="bodyMedium">
                    Начните новый "Pomodoro" и повторите шаги 2-4.
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
                    P.S. После каждого четвёртого "Pomodoro" сделайте более
                    длительный перерыв (15-30 минут).
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
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Ваш Помидор
          </List.Subheader>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {taskPomodoro.id ? (
              <Card
                style={{ width: "90%" }}
                onPress={() => openDialogDetalsTask()}
              >
                <Card.Title
                  style={{ marginRight: 5 }}
                  title={taskPomodoro.title}
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
                        icon={renderIconStatus(taskPomodoro.status)}
                      />
                    )}
                    right={(props) => (
                      <Text {...props}>{taskPomodoro.status}</Text>
                    )}
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
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader style={{ marginHorizontal: 5 }}>
            Таймер
          </List.Subheader>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Card style={{ width: "90%", marginLeft: 0, marginBottom: 5 }}>
              <Card.Content>
                <CustomTimer />
              </Card.Content>
            </Card>
          </View>
        </List.Section>
        <DialogUpdateTaskTechnique
          visible={visibleDialogUpdateTask}
          setVisible={setVisibleDialogUpdateTask}
          task={taskPomodoro}
          technique="Pomodoro"
        />
        <DialogDetalsTaskTechnique
          visible={visibleDialogDetalsTask}
          setVisible={setVisibleDialogDetalsTask}
          task={taskPomodoro}
        />
        <DialogCreateTaskTechnique
          visible={visibleDialogCreateTask}
          setVisible={setVisibleDialogCreateTask}
          technique="Pomodoro"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 162,
    paddingBottom: 10,
  },
});
