import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "../screens/Registration";
import { LoginScreen } from "../screens/Login";
import { DriwerNavigationConatiner } from "./DrawerContainer";
import { RootNavigationConatinerProps, RootStackParamList } from "./models";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigationConatiner: React.FC<
  RootNavigationConatinerProps
> = ({ isLoggedIn }) => {
  const initialRoute = isLoggedIn ? "Home" : "Login";

  return (
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Home"
          component={DriwerNavigationConatiner}
          options={{ headerShown: false}}
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
