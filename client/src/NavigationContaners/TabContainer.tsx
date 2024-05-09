import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationsScreen } from "../screens/Notifications";
import { SchedulerScreen } from "../screens/Scheduler";
import { CategoriesScreen } from "../screens/Сategories";
import {
    Feather,
    MaterialCommunityIcons,
    Ionicons,
  } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/Profile";

export type TabStackParamList = {
  Категории: undefined;
  Планировщик: undefined;
  Уведомления: undefined;
  Профиль: undefined;
};

type TabNavigationConatinerProps = "Категории" | "Уведомления" | "Профиль" | "Планировщик";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigationConatiner = (screen: TabNavigationConatinerProps) => {
  return (
      <Tab.Navigator
        initialRouteName={screen}
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Категории"
          component={CategoriesScreen}
          options={{
            title: "Категории",
            // headerTitle: "Категории",
            tabBarIcon: ({ color, size }) => (
              <Feather name="list" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Планировщик"
          component={SchedulerScreen}
          options={{
            title: "Планировщик",
            // headerTitle: "Планировщик",
            tabBarIcon: ({ color, size }) => (
              <Feather name="clock" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Уведомления"
          component={NotificationsScreen}
          options={{
            title: "Уведомления",
            // headerTitle: 'Уведомления',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Профиль"
          component={ProfileScreen}
          options={{
            title: "Профиль",
            // headerShown: true,
            // headerTitle: 'Профиль',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

// export type StackParamListSheduler = {
//     Планировщик: undefined;
//   };
  
//   export type StackParamListCategories = {
//     Категории: undefined;
//   };

// const Stack_1 = createNativeStackNavigator<StackParamListCategories>();
// const Stack_2 = createNativeStackNavigator<StackParamListSheduler>();

// const CategoriesStack = () => (
//   <Stack_1.Navigator
//     initialRouteName="Категории"
//     screenOptions={{ headerShown: false }}
//   >
//     <Stack_1.Screen
//       name="Категории"
//       component={CategoriesScreen}
//       options={{ title: "Категории" }}
//     />
//   </Stack_1.Navigator>
// );

// const ShedulerStack = () => (
//   <Stack_2.Navigator
//     initialRouteName="Планировщик"
//     screenOptions={{ headerShown: false }}
//   >
//     <Stack_2.Screen
//       name="Планировщик"
//       component={SchedulerScreen}
//       options={{ title: "Планировщик" }}
//     />
//   </Stack_2.Navigator>
// );