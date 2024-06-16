import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
import { FC } from "react";
import { StatusBar, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { StackShedulerParamList } from "../../Navigation/models";
import { Loading } from "../../components/custom/Loading";
import { ListTasks } from "../Scheduler/ListTasks";
import { ShedulerFAB } from "../Scheduler/FAB";
import { useAppSelector } from "../../hooks/redux";

export const CategoryScreen: FC = (): JSX.Element => {
  const route = useRoute<RouteProp<StackShedulerParamList>>();
  const { tasks } = useAppSelector((state) => state.taskManagerReducer);
  const { isLoading } = useAppSelector((state) => state.taskManagerReducer);
  const {colors} = useTheme();
  const params = route.params;

  const findTaskByCategory = (nameCategory: string | undefined) => {
    return tasks.filter(el => el.category === nameCategory);
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.card} />
      <ScrollView>
        {isLoading ? <Loading /> : <ListTasks tasks={findTaskByCategory(params?.title)} />}
      </ScrollView>
      <ShedulerFAB />
    </View>
  );
};
