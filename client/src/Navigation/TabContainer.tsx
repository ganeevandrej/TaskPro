import { NotificationsScreen } from "../screens/Notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/Profile";
import { Icon } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { DialogUpdateUserInfo } from "../components/Dialogs/UpdateUserInfo";
import { TechnipuesScreen } from "../screens/Techniques";
import { TabStackParamList } from "./models";
import { StackShedulerConatiner } from "./StackSheduler";
import { RenderIcon } from "../components/custom/RenderIcon";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigationConatiner = () => {
  const [visibleDialogUpdateData, setVisibleDialogUpdateData] =
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
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Техники",
            headerLeft: () => (
              <RenderIcon
                nameIcon="menu"
                callback={() => navigation.openDrawer()}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Icon source="head-lightbulb-outline" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="Планировщик"
          component={StackShedulerConatiner}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="clock-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Уведомления"
          component={NotificationsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Уведомления",
            headerLeft: () => (
              <RenderIcon
                nameIcon="menu"
                callback={() => navigation.openDrawer()}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Icon source="bell-outline" size={size} color={color} />
            ),
            tabBarBadge: 1,
          })}
        />
        <Tab.Screen
          name="Профиль"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: "Профиль",
            headerLeft: () => (
              <RenderIcon
                nameIcon="menu"
                callback={() => navigation.openDrawer()}
              />
            ),
            headerRight: () => (
              <RenderIcon
                nameIcon="account-edit"
                callback={() => setVisibleDialogUpdateData(true)}
              />
            ),
            tabBarIcon: ({ color, size }) => (
              <Icon source="account-outline" size={size} color={color} />
            ),
          })}
        />
      </Tab.Navigator>
      <DialogUpdateUserInfo
        visible={visibleDialogUpdateData}
        setVisible={setVisibleDialogUpdateData}
      />
    </>
  );
};
