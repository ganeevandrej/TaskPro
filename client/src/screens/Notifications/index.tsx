import { View } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../../hooks/redux";

export const NotificationsScreen: React.FC = (): React.JSX.Element => {
  const { notifications } = useAppSelector(state => state.notificationReducer);

  return (
    <View>
      {
        notifications && notifications.map((el) => {
          return <Button key={el.id}>{el.message}</Button>;
        })
      }
    </View>
  );
};