import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/custom/DriwerContent";
import { TabNavigationConatiner } from "./TabContainer";
import { SchedulerScreen } from "../screens/Scheduler";

export type DrawerParamList = {
  Sheduler: undefined;
  Notification: undefined;
  Categories: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DriwerNavigationConatiner = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Sheduler"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Sheduler">
        {() => TabNavigationConatiner("Планировщик")}
      </Drawer.Screen>
      <Drawer.Screen name="Categories">
        {() => TabNavigationConatiner("Категории")}
      </Drawer.Screen>
      <Drawer.Screen name="Notification">
        {() => TabNavigationConatiner("Уведомления")}
      </Drawer.Screen>
      <Drawer.Screen name="Profile">
        {() => TabNavigationConatiner("Профиль")}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
