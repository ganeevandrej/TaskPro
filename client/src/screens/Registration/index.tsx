import { View, StyleSheet } from "react-native";
import { FormRegistration } from "../../components/Forms/Registration";
import { Card, Text } from "react-native-paper";

export const RegistrationScreen: React.FC = (): React.JSX.Element => {
  return (
    <View>
      <Card style={styles.card}>
        <Card.Title titleStyle={styles.cardTitle} title="Зарегистрируйтесь в системе" />
        <Card.Content style={{ marginTop: 0 }}>
        <FormRegistration />
        </Card.Content>
      </Card>
      <Text style={{marginTop: "30%", ...styles.signature}} variant="bodySmall">© 2024 TaskPro</Text>
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
