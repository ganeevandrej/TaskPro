import { ScrollView, View } from "react-native";
import { Card, List, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { INotification } from "../../store/reducers/notifications/NotificationSlice";
import {
  dateToString,
  timeToString,
} from "../../components/Dialogs/DetalsTask";
import { useCallback, useEffect } from "react";
import { CustomButton } from "../../components/custom/Button";
import {
  readNotifications,
  removeNotification,
} from "../../store/reducers/notifications/ActionCreators";
import { useFocusEffect } from "@react-navigation/native";
import { CustomStatusBar } from "../../components/custom/StatusBar";
import { useDriwer } from "../../contexts/driwer-context";

export interface IRenderItemProps {
  item: INotification;
}

interface IInotifications {
  badgeCount: number | undefined;
}

const RenderItem: React.FC<IRenderItemProps> = ({
  item,
}): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const deleteNotification = (taskId: number) => {
    dispatch(removeNotification(taskId));
  };

  return (
    <Card
      key="5"
      style={{ width: "92%", marginLeft: 15, marginBottom: 10, marginTop: 15 }}
    >
      <Card.Content style={{ paddingBottom: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <Icon source="bell" size={20} /> */}
          <Text style={{ width: "90%" }} variant="titleMedium">
            {item.message}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text variant="bodyMedium">
            {item.createdAt &&
              `${dateToString(item.createdAt)} в ${timeToString(
                item.createdAt
              )}`}
          </Text>
          <CustomButton
            title="Удалить"
            callback={() => deleteNotification(item.id)}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export const NotificationsScreen: React.FC<IInotifications> = ({
  badgeCount,
}): React.JSX.Element => {
  const { notifications } = useAppSelector(
    (state) => state.notificationReducer
  );
  const { id } = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const { handlerSetActive } = useDriwer();

  useFocusEffect(
    useCallback(() => {
      handlerSetActive("Уведомления");
      if (badgeCount) {
        dispatch(readNotifications(id));
      }
    }, [badgeCount])
  );

  const renderItem = ({ item }: { item: INotification }) => (
    <RenderItem item={item} />
  );

  return (
    <ScrollView>
      <CustomStatusBar />
      <List.Section>
        {notifications && notifications.map((item) => (
          <RenderItem
            key={item.id}
            item={item}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
};
