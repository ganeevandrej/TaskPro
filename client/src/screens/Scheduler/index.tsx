import { CompositeNavigationProp, NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchLogout } from "../../store/reducers/auth/ActionCreators";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { TabStackParamList } from "../../NavigationContaners/TabContainer";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DialogCreateTask } from "../../components/Dialogs/CreateTask";

type SchedulerScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList,  'Планировщик'>,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export const SchedulerScreen = (): React.JSX.Element => {
  const nav = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { isLoading, isAuth } = useAppSelector((state) => state.authReducer);
  const [visibleDialogCreateTask, setVisibleDialogCreateTask] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SchedulerScreenProps>();

  // useEffect(() => {
  //   if(!isAuth) {
  //     navigation.navigate("Login");
  //   }
  // }, [isAuth])

  const logout = () => {
    dispatch(fetchLogout());
    navigation.replace("Login");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Header navigation={nav} />
      <Button mode="outlined" onPress={() => setVisibleDialogCreateTask(true)}>
        Добавить задачу
      </Button>
      <DialogCreateTask visible={visibleDialogCreateTask} setVisible={(setVisibleDialogCreateTask)} />
    </View>
  );
};
