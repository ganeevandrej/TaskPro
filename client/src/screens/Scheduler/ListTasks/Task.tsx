import { StyleSheet } from "react-native";
import { Card, IconButton, List, Text } from "react-native-paper";
import { ITask } from "../../../store/reducers/taskManager/TaskManagerSlice";

export interface renderItemProps {
  item: ITask;
  onPressCard: (item: ITask) => void;
  onPressIcon: (item: ITask) => void;
}

export const Task: React.FC<renderItemProps> = ({
  item,
  onPressCard,
  onPressIcon,
}): React.JSX.Element => {
  const renderIconStatus = (status: string): string => {
    if (status === "Завершена") return "check";
    if (status === "Активная") return "progress-question";
    return "alert-remove";
  };

  return (
    <Card style={styles.card} onPress={() => onPressCard(item)}>
      <Card.Title
        style={styles.cardTitle}
        title={item.name}
        right={() => (
          <IconButton
            icon="square-edit-outline"
            onPress={() => onPressIcon(item)}
          />
        )}
      />
      <Card.Content style={styles.cardContent}>
        <List.Item
          style={styles.listItem}
          titleStyle={{ fontSize: 14 }}
          title="Статус"
          left={(props) => (
            <List.Icon {...props} icon={renderIconStatus(item.status)} />
          )}
          right={(props) => <Text {...props}>{item.status}</Text>}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "90%",
    marginBottom: 10,
  },
  cardTitle: {
    paddingRight: 7
  },
  cardContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  listItem: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: "center",
  },
});
