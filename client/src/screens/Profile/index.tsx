import { View, ScrollView, Alert } from "react-native";
import { Header } from "../../components/Header";
import { Card, List, Switch, Text, TouchableRipple } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { useTheme } from "../../contexts/theme-context";
import { ImagePickerExample } from "../../components/FileUpload";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useState } from "react";
import { DialogUpdateUserInfo } from "../../components/Dialogs/UpdateUserInfo";
import { fetchLogout } from "../../store/reducers/auth/ActionCreators";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { DialogActivateEmail } from "../../components/Dialogs/ActivateEmail";
const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Выполненные",
    population: 80,
    color: "#2ece25",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14,
  },
  {
    name: "Просроченные",
    population: 20,
    color: "#e74c3c",
    legendFontColor: "#7F7F7F",
    legendFontSize: 14,
  },
];

export const ProfileScreen: React.FC = (): React.JSX.Element => {
  const { name, email, phone, dateBirth, isActivated } = useAppSelector(
    (state) => state.authReducer.user
  );
  const dispatch = useAppDispatch();
  const { toggleTheme, isThemeDark } = useTheme();
  const [visibleDialogUpdateData, setVisibleDialogUpdateData] =
    useState<boolean>(false);
    const [visibleDialogActivate, setVisibleDialogActivate] =
    useState<boolean>(false);
  const navigationRoot = useNavigation<NavigationProp<RootStackParamList>>();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const logout = () => {
    Alert.alert(
      "Подтверждение выхода",
      "Вы действительно хотите выйти из аккаунта?",
      [
        {
          text: "Отмена",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Выйти",
          onPress: () => {
            dispatch(fetchLogout());
            navigationRoot.navigate("Login");
          },
        },
      ]
    );
  };

  const OpenDialogActivate = () => {
    if(isActivated) return;
    setVisibleDialogActivate(true);
  }

  return (
    <View style={{ paddingBottom: 64 }}>
      <Header navigation={navigation} />
      <ScrollView>
        <ImagePickerExample />
        <Text
          style={{ alignSelf: "center", marginTop: 10 }}
          variant="titleLarge"
        >
          {name ? name : "Я Гость!"}
        </Text>
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
            <DialogActivateEmail visible={visibleDialogActivate}
              setVisible={setVisibleDialogActivate} />
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
            <TouchableRipple onPress={() => setVisibleDialogUpdateData(true)}>
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
            <DialogUpdateUserInfo
              visible={visibleDialogUpdateData}
              setVisible={setVisibleDialogUpdateData}
            />
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
        <List.Subheader>Аналитика задач</List.Subheader>
        <Card style={{ alignSelf: "center", width: "90%" }}>
          <Card.Content style={{ paddingHorizontal: 5, paddingVertical: 0 }}>
            <PieChart
              data={data}
              width={screenWidth - 50}
              height={120}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"-25"}
              center={[0, 0]}
            />
          </Card.Content>
        </Card>
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
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={(props) => (
                <Switch
                  value={isThemeDark}
                  {...props}
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
                // right={(props) => (
                //   <List.Icon {...props} icon="phone" />
                // )}
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
              // right={(props) => (
              //   <List.Icon {...props} icon="phone" />
              // )}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};
