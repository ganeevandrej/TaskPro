import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/custom/DriwerContent";
import { TabNavigationConatiner } from "./TabContainer";
import { DrawerParamList } from "./models";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAvatar } from "../store/reducers/auth/ActionCreators";
import { TimerProvider } from "../contexts/timer-context";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
import { registerTokenToServer } from "../store/reducers/notifications/ActionCreators";
import { ITask, taskManagerSlice } from "../store/reducers/taskManager/TaskManagerSlice";

const Drawer = createDrawerNavigator<DrawerParamList>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const DriwerNavigationConatiner = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    dispatch(getAvatar(user.id));

    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      sendPushTokenToServer(user.id, token);
    });

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // const title = notification.request.content.title || 'No Title';
        // const body = notification.request.content.body || 'No Body';
        dispatch(taskManagerSlice.actions.updateTaskStatus(notification.request.content.data as ITask));
        // return Alert.alert(title, body);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { created_at: new Date(), status: "Непрочитано", userId: user.id },
    };
  }

  async function sendPushTokenToServer(userId: number, token: string) {
    dispatch(registerTokenToServer(userId, token));
  }

  async function registerForPushNotificationsAsync(): Promise<string> {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return "";
      }

      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token ? token : "";
  }

  return (
    <TimerProvider>
      <Drawer.Navigator
        initialRouteName="Scheduler"
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Scheduler" component={TabNavigationConatiner} />
        <Drawer.Screen name="Category" component={TabNavigationConatiner} />
        <Drawer.Screen name="Notification" component={TabNavigationConatiner} />
        <Drawer.Screen name="Profile" component={TabNavigationConatiner} />
      </Drawer.Navigator>
    </TimerProvider>
  );
};
