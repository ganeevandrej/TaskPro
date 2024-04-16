import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "./src/screens/Registration";
import { LoginScreen } from "./src/screens/Login";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import React from "react";
import { HomeScreen } from "./src/screens/Home";

export interface User {
  username: string;
  id: number;
  email: string;
  phone: string;
}

export type RootStackParamList = {
  Home: undefined;
  Registration: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ title: "Регистрация" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Вход в систему" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
