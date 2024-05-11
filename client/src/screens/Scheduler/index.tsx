import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { View, FlatList } from "react-native";
import {
  Button,
  Card,
  FAB,
  Icon,
  List,
  Searchbar,
  ToggleButton,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { TabStackParamList } from "../../NavigationContaners/TabContainer";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DialogCreateTask } from "../../components/Dialogs/CreateTask";
import { ITask } from "../../store/reducers/taskManager/TaskManagerSlice";
import { fetchgetTaskManager } from "../../store/reducers/taskManager/ActionCreators";
import { ScrollView } from "react-native-virtualized-view";
import { DialogDetalsTask } from "../../components/Dialogs/DetalsTask";
import { DialogUpdateTask } from "../../components/Dialogs/UpdateTask";

type SchedulerScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Планировщик">,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

const initialTask = {
  id: 0,
  deadline: new Date(),
  name: "",
  status: "",
  category: "",
  priority: "",
};

export const SchedulerScreen = (): React.JSX.Element => {
  const nav = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { isLoading, tasks } = useAppSelector(
    (state) => state.taskManagerReducer
  );
  const { user } = useAppSelector((state) => state.authReducer);
  const [visibleDialogCreateTask, setVisibleDialogCreateTask] =
    useState<boolean>(false);
  const [task, setTask] = useState<ITask>(initialTask);
  const [taskUpdate, setTaskUpdate] = useState<number>(0);
  const [visibleDialogUpdateTask, setVisibleDialogUpdateTask] =
    useState<boolean>(false);
  const [visibleDialogDetalsTask, setVisibleDialogDetalsTask] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("left");

  useEffect(() => {
    if (user.id) {
      dispatch(fetchgetTaskManager(user.id));
    }
  }, [user.id]);

  // if (isLoading) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  const RightPart = () => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon source="playlist-edit" size={25} />
        <Icon source="delete-empty" size={25} />
      </View>
    );
  };

  const handleAddCategories = () => {
    console.log("Hello");
  };

  const openDialogDetalsTask = (task: ITask) => {
    setTask(task);
    setVisibleDialogDetalsTask(true);
  };

  const openDialogUpdateTask = (task: ITask) => {
    setTaskUpdate(task.id);
    setVisibleDialogUpdateTask(true);
  };

  const renderItem = ({ item }: { item: ITask }) => {
    return (
      <>
        <Card
          style={{
            alignSelf: "center",
            width: "90%",
            marginBottom: 10,
          }}
          onPress={() => openDialogDetalsTask(item)}
        >
          <Card.Title
            style={{ paddingRight: 20 }}
            title={item.name}
            right={(props) => (
              <TouchableRipple onPress={() => openDialogUpdateTask(item)}>
                <Icon source="square-edit-outline" {...props} size={20} />
              </TouchableRipple>
            )}
          />
          <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
            <List.Item
              style={{
                paddingVertical: 0,
                paddingHorizontal: 0,
                alignItems: "center",
              }}
              titleStyle={{ fontSize: 14 }}
              title="Статус"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={(props) => <Text {...props}>{item.status}</Text>}
            />
          </Card.Content>
        </Card>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={nav} />
      <ScrollView>
        <Searchbar
          style={{ paddingRight: 20, marginTop: 20, marginHorizontal: 20 }}
          placeholder="Поиск..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          right={(props) => (
            <Icon source="filter-outline" {...props} size={25} />
          )}
        />
        <List.Section>
          <List.Subheader>Сортировка</List.Subheader>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ToggleButton.Row
              style={{ marginLeft: 20 }}
              onValueChange={(value) => setValue(value)}
              value={value}
            >
              <ToggleButton icon="sort-calendar-ascending" value="left" />
              <ToggleButton icon="sort-calendar-descending" value="right" />
            </ToggleButton.Row>
            <Button
              style={{ marginRight: 20, padding: 0 }}
              onPress={handleAddCategories}
            >
              Добавить категорию
            </Button>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader>Задачи</List.Subheader>
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          />
        </List.Section>
      </ScrollView>
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          zIndex: 5,
        }}
        icon="plus"
        onPress={() => setVisibleDialogCreateTask(true)}
      />
      <DialogDetalsTask
        visible={visibleDialogDetalsTask}
        setVisible={setVisibleDialogDetalsTask}
        task={task}
      />
      <DialogCreateTask
        visible={visibleDialogCreateTask}
        setVisible={setVisibleDialogCreateTask}
      />
      <DialogUpdateTask
        visible={visibleDialogUpdateTask}
        setVisible={setVisibleDialogUpdateTask}
        taskId={taskUpdate}
      />
    </View>
  );
};
