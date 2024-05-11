import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "../screens/Registration";
import { LoginScreen } from "../screens/Login";
import { DriwerNavigationConatiner } from "./DrawerContainer";
import { TabNavigationConatiner } from "./TabContainer";

export type RootStackParamList = {
  Home: undefined;
  Registration: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RootNavigationConatinerProps {
  isLoggedIn: boolean;
}

export const RootNavigationConatiner: React.FC<
  RootNavigationConatinerProps
> = ({ isLoggedIn }) => {

  return (
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <Stack.Screen
          name="Home"
          component={DriwerNavigationConatiner}
          options={{ 
            headerShown: false,
           }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "Регистрация" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Авторизация" }}
        />
      </Stack.Navigator>
  );
};
