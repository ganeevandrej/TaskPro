import { Platform, View } from "react-native";
import { ActivityIndicator, IconButton, Searchbar } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { ListTasks } from "./ListTasks";
import { Sort } from "./Sort";
import * as Notifications from 'expo-notifications';
import { ShedulerFAB } from "./FAB";
import { DialogFilters } from "../../components/Dialogs/Filters";
import { useDebounce } from "../../hooks/debounce";
import { fetchgetTaskManager } from "../../store/reducers/taskManager/ActionCreators";
import { CustomButton } from "../../components/custom/Button";
import Constants from "expo-constants";
import * as Device from 'expo-device';

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
  const [search, setSearch] = useState<string>("");
  const debouncedSearchQuery = useDebounce(search, 1000);
  const [sort, setSort] = useState<string>("ASC");
  const [filters, setFilters] = useState<Filters>(filtersInit);
  const [visible, setVisible] = useState<boolean>(false);
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      if (debouncedSearchQuery) {
        const body = {
          userId: user.id,
          sort,
          search: search ? search.toLocaleLowerCase() : "",
        };
        await dispatch(fetchgetTaskManager(body));
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

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [sort, filters]);

  async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { created_at: new Date(), status: "Непрочитано", userId: user.id },
    };
  
    
  }

  async function registerForPushNotificationsAsync(): Promise<string> {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return "";
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token ? token : "";
  }

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
        {isLoading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : (
          <ListTasks />
        )}
      </ScrollView>
      <ShedulerFAB />
    </View>
  );
};
