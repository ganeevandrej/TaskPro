import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "./src/components/screens/RegistrationScreen";
import { LoginScreen } from "./src/components/screens/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export interface User {
  username: string;
  id: number;
  email: string;
  phone: string;
}

export type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = (): React.JSX.Element => {
  return (
    <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ title: "registration" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "login" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
