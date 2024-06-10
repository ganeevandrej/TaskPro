import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "../screens/Registration";
import { LoginScreen } from "../screens/Login";
import { DriwerNavigationConatiner } from "./DrawerContainer";
import { RootStackParamList } from "./models";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { getAvatar } from "../store/reducers/auth/ActionCreators";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigationConatiner = () => {
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Screen
          name="Home"
          component={DriwerNavigationConatiner}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Авторизация", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ title: "Регистрация", headerTitleAlign: "center" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
