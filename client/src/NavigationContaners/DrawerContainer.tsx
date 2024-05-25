import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "../components/custom/DriwerContent";
import { TabNavigationConatiner } from "./TabContainer";
import { DrawerParamList } from "./models";

const Drawer = createDrawerNavigator<DrawerParamList>();

export const DriwerNavigationConatiner = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Scheduler"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Scheduler" component={TabNavigationConatiner} />
      <Drawer.Screen name="Categories" component={TabNavigationConatiner} />
      <Drawer.Screen name="Notification" component={TabNavigationConatiner} />
      <Drawer.Screen name="Profile" component={TabNavigationConatiner} />
    </Drawer.Navigator>
  );
};
