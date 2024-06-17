import { View, StyleSheet } from "react-native";
import { FormRegistration } from "../../components/Forms/Registration";
import { Card, Text } from "react-native-paper";
import { CustomStatusBar } from "../../components/custom/StatusBar";

export const RegistrationScreen: React.FC = (): React.JSX.Element => {
  return (
    <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between"}}>
      <CustomStatusBar />
      <Card style={styles.card}>
        <Card.Title titleStyle={styles.cardTitle} title="Зарегистрируйтесь в системе" />
        <Card.Content style={{ marginTop: 0 }}>
        <FormRegistration />
        </Card.Content>
      </Card>
      <Text style={{marginBottom: 40, ...styles.signature}} variant="bodySmall">© 2024 TaskPro</Text>
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
    color: "#666666",
    textAlign: "center",
    fontSize: 14,
  }
});
