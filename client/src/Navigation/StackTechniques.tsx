import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackTechniquesParamList } from "./models";
import { TechnipuesScreen } from "../screens/Techniques";
import { RenderIcon } from "../components/custom/RenderIcon";
import { PomodoroScreen } from "../screens/Pomodoro";
import { MethodScreen } from "../screens/Method";
import { EatThatFlogScreen } from "../screens/EatThatFlog";

const Stack = createNativeStackNavigator<StackTechniquesParamList>();

export const StackTechniquesConatiner = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Techniques">
      <Stack.Screen
          name="Techniques"
          component={TechnipuesScreen}
          options={({ navigation }) => ({
            headerTitle: "Техники",
            headerTitleAlign: "center",
            headerLeft: () => (
              <RenderIcon
                nameIcon="menu"
                callback={() => navigation.openDrawer()}
              />
            )
          })}
        />
        <Stack.Screen
          name="EatThatFrog"
          component={EatThatFlogScreen}
          options={{
            headerShown: true,
            headerTitle: "Eat That Frog",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Pomodoro"
          component={PomodoroScreen}
          options={{
            headerShown: true,
            headerTitle: "Pomodoro Technique",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Method"
          component={MethodScreen}
          options={{
            headerShown: true,
            headerTitle: "1-3-5 Method",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </>
  );
};
