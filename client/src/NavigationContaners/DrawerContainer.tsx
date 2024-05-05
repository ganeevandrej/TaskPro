import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/custom/DriwerContent";
import { TabNavigationConatiner, TabStackParamList } from "./TabContainer";

export type DrawerParamList = {
  Sheduler: undefined;
  Notification: undefined;
  Categories: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DriwerNavigationConatiner = () => {
  return (
      <Drawer.Navigator initialRouteName="Sheduler" screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Sheduler">
          {() => TabNavigationConatiner('Планировщик')}
          </Drawer.Screen>
        <Drawer.Screen name="Categories">
          {() => TabNavigationConatiner('Categories')}
        </Drawer.Screen>
        <Drawer.Screen name="Notification">
          {() => TabNavigationConatiner('Notification')}
        </Drawer.Screen>
      </Drawer.Navigator>
  );
};