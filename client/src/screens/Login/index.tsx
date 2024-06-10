import { View, StyleSheet } from "react-native";
import { FormLogin } from "../../components/Forms/Login";
import { Card, Text } from "react-native-paper";

export const LoginScreen: React.FC = (): React.JSX.Element => {
  return (
    <View>
      <Card style={styles.card}>
        <Card.Title titleStyle={styles.cardTitle} title="Войдите в систему" />
        <Card.Content style={{ marginTop: 0 }}>
          <FormLogin />
        </Card.Content>
      </Card>
      <Text style={{marginTop: "55%", ...styles.signature}} variant="bodySmall">© 2024 TaskPro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    width: "90%",
    marginTop: "20%",
  },
  cardTitle: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 0,
  },
  signature: {
    color: "#333333",
    textAlign: "center",
  }
});
