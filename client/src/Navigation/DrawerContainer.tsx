import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/custom/DriwerContent";
import { TabNavigationConatiner } from "./TabContainer";
import { DrawerParamList } from "./models";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAvatar } from "../store/reducers/auth/ActionCreators";
import { TimerProvider } from "../contexts/timer-context";
import * as Notifications from "expo-notifications";
import { DriwerProvider } from "../contexts/driwer-context";
import { getNotifications, registerTokenToServer } from "../store/reducers/notifications/ActionCreators";
import { ITask, taskManagerSlice } from "../store/reducers/taskManager/TaskManagerSlice";
import { ITaskTechnique, TechniquesSlice } from "../store/reducers/techniques/TechniquesSlice";

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DriwerNavigationConatiner: React.FC<{pushToken: string}> = ({pushToken}) => {
  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    dispatch(getAvatar(user.id));
    if(pushToken) {
      dispatch(registerTokenToServer(user.id, pushToken));
    }
    

    notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          if (notification.request.content.data.name) {
            dispatch(
              taskManagerSlice.actions.updateTaskStatus(
                notification.request.content.data as ITask
              ));
          } else {
            dispatch(
              TechniquesSlice.actions.updateTask(
                notification.request.content.data as ITaskTechnique
              ));
          }
          dispatch(getNotifications(user.id));
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
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
      };
  }, [pushToken]);

  return (
    <TimerProvider>
      <DriwerProvider>
        <Drawer.Navigator
          initialRouteName="Scheduler"
          screenOptions={{ headerShown: false }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Scheduler" component={TabNavigationConatiner} />
          <Drawer.Screen name="Techniques" component={TabNavigationConatiner} />
          <Drawer.Screen
            name="Notification"
            component={TabNavigationConatiner}
          />
          <Drawer.Screen name="Profile" component={TabNavigationConatiner} />
        </Drawer.Navigator>
      </DriwerProvider>
    </TimerProvider>
  );
};
