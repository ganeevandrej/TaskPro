import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { Card, List, Switch, Text, TouchableRipple, useTheme } from "react-native-paper";
import { useTheme as useThemeContext } from "../../contexts/theme-context";
import { ImagePickerExample } from "../../components/FileUpload";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useState } from "react";
import { fetchLogout } from "../../store/reducers/auth/ActionCreators";
import { DialogActivateEmail } from "../../components/Dialogs/ActivateEmail";
import { Analytics } from "./Analytics/Analytics";

export const ProfileScreen: React.FC = (): React.JSX.Element => {
  const [visibleDialogActivate, setVisibleDialogActivate] =
    useState<boolean>(false);
  const { user, analytics } = useAppSelector(
    (state) => state.authReducer
  );
  const dispatch = useAppDispatch();
  const { toggleTheme, isThemeDark } = useThemeContext();
  const { id, name, email, phone, dateBirth, isActivated } = user;
  const {colors} = useTheme();

  const logout = () => {
    Alert.alert("Выход", "Вы действительно хотите выйти из аккаунта?", [
      {
        text: "Отмена",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Выйти",
        onPress: () => {
          dispatch(fetchLogout());
        },
      },
    ]);
  };

  const OpenDialogActivate = () => {
    if (isActivated) return;
    setVisibleDialogActivate(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ImagePickerExample />
        <Text
          style={{ alignSelf: "center", marginTop: 10 }}
          variant="titleLarge"
        >
          {name ? name : "Я Гость!"}
        </Text>
        <List.Section>
          <List.Subheader>Информация о пользователе</List.Subheader>
          <Card
            style={{
              borderBottomLeftRadius: 0,
              alignSelf: "center",
              borderBottomRightRadius: 0,
              width: "90%",
            }}
          >
            <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
              <TouchableRipple onPress={OpenDialogActivate}>
                <List.Item
                  titleStyle={{ fontSize: 14, marginBottom: 5 }}
                  title="Email"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={isActivated ? "check-circle" : "alert-circle-check"}
                    />
                  )}
                  right={(props) => (
                    <Text variant="bodyMedium" {...props}>
                      {email}
                    </Text>
                  )}
                />
              </TouchableRipple>
              <DialogActivateEmail
                visible={visibleDialogActivate}
                setVisible={setVisibleDialogActivate}
              />
            </Card.Content>
          </Card>
          <Card
            style={{
              borderRadius: 0,
              marginVertical: 3,
              alignSelf: "center",
              width: "90%",
            }}
          >
            <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
              <TouchableRipple>
                <List.Item
                  titleStyle={{ fontSize: 14, marginBottom: 5 }}
                  title="Дата рожд."
                  left={(props) => <List.Icon {...props} icon="calendar" />}
                  right={(props) => (
                    <Text
                      style={{ marginBottom: 5 }}
                      variant="bodyMedium"
                      {...props}
                    >
                      {dateBirth ? dateBirth : "Укажите дату рожд."}
                    </Text>
                  )}
                />
              </TouchableRipple>
            </Card.Content>
          </Card>
          <Card
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              alignSelf: "center",
              width: "90%",
            }}
          >
            <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
              <List.Item
                titleStyle={{ fontSize: 14, marginBottom: 5 }}
                title="Phone"
                left={(props) => <List.Icon {...props} icon="phone" />}
                right={(props) => (
                  <Text
                    style={{ marginBottom: 5 }}
                    variant="bodyMedium"
                    {...props}
                  >
                    {phone ? phone : "Укажите свой номер"}
                  </Text>
                )}
              />
            </Card.Content>
          </Card>
        </List.Section>
        <Analytics userId={id} analytics={analytics} />
        <List.Section>
          <List.Subheader>Пользовательские настройки</List.Subheader>
          <Card
            style={{
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              alignSelf: "center",
              width: "90%",
            }}
          >
            <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
              <List.Item
                titleStyle={{ fontSize: 14, marginBottom: 5 }}
                style={{ paddingVertical: 0 }}
                title="Черная тема"
                left={(props) => (
                  <List.Icon {...props} icon="theme-light-dark" />
                )}
                right={(props) => (
                  <Switch
                    color={colors.primary}
                    value={isThemeDark}
                    onValueChange={toggleTheme}
                  />
                )}
              />
            </Card.Content>
          </Card>
          <Card
            style={{
              borderRadius: 0,
              marginVertical: 3,
              alignSelf: "center",
              width: "90%",
            }}
          >
            <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
              <TouchableRipple onPress={logout}>
                <List.Item
                  titleStyle={{ fontSize: 14, marginBottom: 5 }}
                  title="Выйти из аккуанта"
                  left={(props) => <List.Icon {...props} icon="logout" />}
                />
              </TouchableRipple>
            </Card.Content>
          </Card>
          <Card
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              alignSelf: "center",
              width: "90%",
              marginBottom: 20,
            }}
          >
            <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
              <List.Item
                titleStyle={{ fontSize: 14, marginBottom: 5 }}
                title="Удалить аккаунт"
                left={(props) => <List.Icon {...props} icon="account-cancel" />}
              />
            </Card.Content>
          </Card>
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 0,
    alignSelf: "center",
    borderBottomRightRadius: 0,
    width: "90%",
  },
});
