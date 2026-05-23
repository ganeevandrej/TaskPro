import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackShedulerParamList } from "./models";
import { CategoriesScreen } from "../screens/Сategories";
import { SchedulerScreen } from "../screens/Scheduler";
import { useState } from "react";
import { DialogCreateCategory } from "../components/Dialogs/CreateCategory";
import { RenderIcon } from "../components/custom/RenderIcon";
import { CategoryScreen } from "../screens/Category";

const Stack = createNativeStackNavigator<StackShedulerParamList>();

export const StackShedulerConatiner = () => {
  const [visibleDialogCreateCategory, setVisibleDialogCreateCategory] =
    useState<boolean>(false);

  return (
    <>
      <Stack.Navigator initialRouteName="Scheduler">
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            headerShown: true,
            headerTitle: "Категории",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={(props: any) => ({
            headerShown: true,
            headerTitle: props.route.params.title,
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="Scheduler"
          component={SchedulerScreen}
          options={({ navigation }) => ({
            headerTitle: "Планировщик",
            headerTitleAlign: "center",
            headerLeft: () => (
              <RenderIcon
                nameIcon="menu"
                callback={() => navigation.openDrawer()}
              />
            ),
            // headerRight: () => (
            //   <RenderIcon
            //     nameIcon="folder-plus-outline"
            //     callback={() => setVisibleDialogCreateCategory(true)}
            //   />
            // ),
          })}
        />
      </Stack.Navigator>
      <DialogCreateCategory
        visible={visibleDialogCreateCategory}
        setVisible={setVisibleDialogCreateCategory}
      />
    </>
  );
};
