import { Card, List, Text } from "react-native-paper";
import { IAnalytics } from "../../../store/reducers/auth/AuthSlice";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { fetchAnalytics } from "../../../store/reducers/auth/ActionCreators";
import { Diagram } from "./Diagram";
import { Loading } from "../../../components/custom/Loading";
import { CustomButton } from "../../../components/custom/Button";
import { TabStackParamList } from "../../../Navigation/models";

interface IAnalyticsProps {
  userId: number;
  analytics: IAnalytics[];
}

export const Analytics: React.FC<IAnalyticsProps> = ({
  userId,
  analytics,
}): React.JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const tasksFromManager = useAppSelector((state) => state.taskManagerReducer.tasks);
  const { taskFlog, taskPomodoro, tasks } = useAppSelector(state => state.techniquesManagerReducer);
  const dispatch = useAppDispatch();

  useEffect(
    useCallback(() => {
      const getTasks = async () => {
        setLoading(true);
        await dispatch(fetchAnalytics(userId));
        setLoading(false);
      };

      getTasks();
    }, []),
    [tasksFromManager, taskFlog, taskPomodoro, tasks]
  );

  const analyticsContent =
    analytics.length > 0 ? (
      <Diagram data={analytics} />
    ) : (
      <ContentEmptyAnalytics />
    );
  const loadingContent = loading ? <Loading marginTop={25} /> : analyticsContent;

  return (
    <List.Section>
      <List.Subheader>Аналитика задач</List.Subheader>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>{loadingContent}</Card.Content>
      </Card>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "90%",
  },
  cardContent: {
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
});

const ContentEmptyAnalytics = () => {
  const navigation = useNavigation<NavigationProp<TabStackParamList>>();

  return (
    <View
      style={{
        marginVertical: 25,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text variant="titleMedium">Список пуст. Создайте задачи</Text>
      <CustomButton
        title="Перейти в планировщик"
        callback={() => navigation.navigate("Планировщик")}
      />
    </View>
  );
};
