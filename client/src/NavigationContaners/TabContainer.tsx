import { NotificationsScreen } from "../screens/Notifications";
import { SchedulerScreen } from "../screens/Scheduler";
import { CategoriesScreen } from "../screens/Сategories";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/Profile";
import { Icon, IconButton } from "react-native-paper";
import { useState } from "react";
import { DialogUpdateUserInfo } from "../components/Dialogs/UpdateUserInfo";
import { DialogCreateCategory } from "../components/Dialogs/CreateCategory";
import { TechnipuesScreen } from "../screens/Techniques";

export type TabStackParamList = {
  Категории: undefined;
  Планировщик: undefined;
  Уведомления: undefined;
  Профиль: undefined;
  Техники: undefined;
};

// type TabNavigationConatinerProps = "Категории" | "Уведомления" | "Профиль" | "Планировщик";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigationConatiner = ({ navigation }: any) => {
  const [visibleDialogUpdateData, setVisibleDialogUpdateData] =
    useState<boolean>(false);
  const [visibleDialogCreateCategory, setVisibleDialogCreateCategory] =
    useState<boolean>(false);
  return (
    <>
      <Tab.Navigator
        initialRouteName="Планировщик"
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="Техники"
          component={TechnipuesScreen}
          options={() => ({
            headerShown: true,
            headerTitle: 'Техники',
            headerLeft: () => (
              <IconButton
                style={{ marginLeft: 10 }}
                icon="menu"
                onPress={() => navigation.openDrawer()}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Icon source="head-lightbulb-outline" size={size} color={color} />
            ),
          })}
        />
        {/* <Tab.Screen
          name="Категории"
          component={CategoriesScreen}
          options={{
            headerShown: true,
            headerTitle: "Категории",
            headerLeft: () => (
              <IconButton
                style={{ marginLeft: 10 }}
                icon="menu"
                onPress={() => navigation.openDrawer()}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Feather name="list" size={size} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Планировщик"
          component={SchedulerScreen}
          options={() => ({
            headerShown: true,
            headerTitle: "Планировщик",
            headerLeft: () => (
              <IconButton
                style={{ marginLeft: 10 }}
                icon="menu"
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerRight: () => (
              <IconButton
                style={{ marginRight: 10 }}
                icon="folder-plus-outline"
                onPress={() => setVisibleDialogCreateCategory(true)}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Feather name="clock" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="Уведомления"
          component={NotificationsScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: 'Уведомления',
            headerLeft: () => (
              <IconButton
                style={{ marginLeft: 10 }}
                icon="menu"
                onPress={() => navigation.openDrawer()}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            ),
            tabBarBadge: 1
          })}
        />
        <Tab.Screen
          name="Профиль"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Профиль",
            headerLeft: () => (
              <IconButton
                style={{ marginLeft: 10 }}
                icon="menu"
                onPress={() => navigation.openDrawer()}
              />
            ),
            headerRight: () => (
              <IconButton
                style={{ marginRight: 10 }}
                icon="account-edit"
                onPress={() => setVisibleDialogUpdateData(true)}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
          })}
        />
      </Tab.Navigator>
      <DialogUpdateUserInfo
        visible={visibleDialogUpdateData}
        setVisible={setVisibleDialogUpdateData}
      />
      <DialogCreateCategory
        visible={visibleDialogCreateCategory}
        setVisible={setVisibleDialogCreateCategory}
      />
    </>
  );
};