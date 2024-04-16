import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome6  } from "@expo/vector-icons";
import { CategoriesScreen } from "../Сategories";
import { SchedulerScreen } from "../Scheduler";
import { NewTaskScreen } from "../NewTask";
import { NotificationsScreen } from "../Notifications";
import { ProfileScreen } from "../Profile";

export type StackParamListSheduler = {
  Main: undefined;
};

export type StackParamListCategories = {
  Main: undefined;
};

const Stack_1 = createNativeStackNavigator<StackParamListCategories>();
const Stack_2 = createNativeStackNavigator<StackParamListSheduler>();

const CategoriesStack = () => (
  <Stack_1.Navigator initialRouteName="Main">
    <Stack_1.Screen
      name="Main"
      component={CategoriesScreen}
      options={{ title: "Категории" }}
    />
  </Stack_1.Navigator>
);

const ShedulerStack = () => (
  <Stack_2.Navigator initialRouteName="Main">
    <Stack_2.Screen
      name="Main"
      component={SchedulerScreen}
      options={{ title: "Планировщик" }}
    />
  </Stack_2.Navigator>
);

export const HomeScreen: React.FC = (): React.JSX.Element => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Sheduler"
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={{ height: "20%" }}
    >
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Sheduler"
        component={ShedulerStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="clock" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewTask"
        component={NewTaskScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
