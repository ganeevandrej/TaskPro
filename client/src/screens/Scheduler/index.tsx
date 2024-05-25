import { View } from "react-native";
import { Icon, Searchbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { fetchgetTaskManager } from "../../store/reducers/taskManager/ActionCreators";
import { ScrollView } from "react-native-virtualized-view";
import { ListTasks } from "./ListTasks";
import { Sort } from "./Sort";
import { ShedulerFAB } from "./FAB";

export const SchedulerScreen = (): React.JSX.Element => {
  const { user } = useAppSelector((state) => state.authReducer);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchgetTaskManager(user.id));
    }
  }, [user.id]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Searchbar
          style={{ paddingRight: 20, marginTop: 20, marginHorizontal: 20 }}
          placeholder="Поиск..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          right={(props) => (
            <Icon source="filter-outline" {...props} size={25} />
          )}
        />
        <Sort />
        <ListTasks />
      </ScrollView>
      <ShedulerFAB />
    </View>
  );
};
