import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "../screens/Registration";
import { LoginScreen } from "../screens/Login";
import { DriwerNavigationConatiner } from "./DrawerContainer";
import { RootStackParamList } from "./models";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./halpers";
import { getNotifications } from "../store/reducers/notifications/ActionCreators";
import { Platform } from "react-native";
import {
  ITask,
  taskManagerSlice,
} from "../store/reducers/taskManager/TaskManagerSlice";
import { NotificationSlice } from "../store/reducers/notifications/NotificationSlice";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigationConatiner = () => {
  const { isAuth, user } = useAppSelector((state) => state.authReducer);
  const [token, setToken] = useState<string>("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const dispatch = useAppDispatch();

  useEffect(
    useCallback(() => {
      registerForPushNotificationsAsync().then((token) => {
        setToken(token);
        dispatch(NotificationSlice.actions.registerToken(token));
      });

      if (Platform.OS === "android") {
        Notifications.getNotificationChannelsAsync().then((value) =>
          setChannels(value ?? [])
        );
      }
    }, []),
    []
  );

  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
        >
          { props => <DriwerNavigationConatiner {...props} pushToken={token} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Авторизация", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ title: "Регистрация", headerTitleAlign: "center" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
