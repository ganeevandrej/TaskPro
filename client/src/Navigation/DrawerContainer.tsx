import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/custom/DriwerContent";
import { TabNavigationConatiner } from "./TabContainer";
import { DrawerParamList } from "./models";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAvatar } from "../store/reducers/auth/ActionCreators";
import { TimerProvider } from "../contexts/timer-context";

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DriwerNavigationConatiner = () => {
  const user = useAppSelector(state => state.authReducer.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAvatar(user.id));
  }, []);

  return (
    <TimerProvider >
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
