import { View } from "react-native";
import { ActivityIndicator, IconButton, Searchbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { ListTasks } from "./ListTasks";
import { Sort } from "./Sort";
import { ShedulerFAB } from "./FAB";
import { DialogFilters } from "../../components/Dialogs/Filters";
import { useDebounce } from "../../hooks/debounce";
import { fetchgetTaskManager } from "../../store/reducers/taskManager/ActionCreators";
import { Loading } from "../../components/custom/Loading";

export interface Filters {
  category: number;
  priority: number;
  status: string;
}

const filtersInit: Filters = {
  category: 0,
  status: "",
  priority: 0,
};

export interface BodyGetTasks {
  filters?: Filters;
  sort?: string;
  search?: string;
  userId: number;
}

export const SchedulerScreen = (): React.JSX.Element => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { isLoading } = useAppSelector((state) => state.taskManagerReducer);
  const { tasks } = useAppSelector((state) => state.taskManagerReducer);
  const [search, setSearch] = useState<string>("");
  const debouncedSearchQuery = useDebounce(search, 1000);
  const [sort, setSort] = useState<string>("ASC");
  const [filters, setFilters] = useState<Filters>(filtersInit);
  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      if (debouncedSearchQuery) {
        const body = {
          userId: user.id,
          sort,
          search: search ? search.toLocaleLowerCase() : "",
        };
        dispatch(fetchgetTaskManager(body));
      }
    };

    getData();
  }, [search]);

  useEffect(() => {
    const getData = async () => {
      const body: BodyGetTasks = { userId: user.id, sort, filters };
      await dispatch(fetchgetTaskManager(body));
    };

    getData();
  }, [sort, filters]);

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        style={{ marginVertical: 20, marginHorizontal: 20 }}
        placeholder="Поиск..."
        onChangeText={setSearch}
        value={search}
        right={(props) => (
          <IconButton
            icon="filter-outline"
            onPress={() => setVisible(true)}
            {...props}
            size={25}
          />
        )}
      />
      <DialogFilters
        visible={visible}
        setVisible={setVisible}
        setFilters={setFilters}
      />
      <ScrollView>
        <Sort value={sort} setValue={setSort} />
        {isLoading ? <Loading /> : <ListTasks tasks={tasks} />}
      </ScrollView>
      <ShedulerFAB />
    </View>
  );
};
