import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { Scheduler } from "./src/screens/Scheduler";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export interface User {
  username: string;
  id: number;
  email: string;
  phone: string;
}

export type RootStackParamList = {
  Registration: undefined;
  Login: undefined;
  Scheduler: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Scheduler">
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
            <Stack.Screen
              name="Scheduler"
              component={Scheduler}
              options={{ title: "Планировщик" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
