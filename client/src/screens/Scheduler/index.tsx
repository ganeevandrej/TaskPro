import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { RootStackParamList } from "../../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  IResponsDataError,
  checkAuth,
  fetchLogout,
} from "../../store/reducers/auth/ActionCreators";
import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import UserService from "../../services/UserService";
import { userSlice } from "../../store/reducers/auth/AuthSlice";

export const Scheduler: React.FC = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isLoading, error, user, isAuth } = useAppSelector(
    (state) => state.authReducer
  );
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const refresh = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken) {
        dispatch(checkAuth());
      } else {
        navigation.navigate("Login");
      }
    };

    refresh();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigation.navigate("Login");
    }
  }, [isAuth]);

  const getUsers = async () => {
    try {
      const res = await UserService.getUsers();
      setUsers(res.data);
    } catch (error) {
      if ((error as AxiosError).response) {
        const axiosError = error as AxiosError<IResponsDataError>;
        const message = axiosError.response?.data.message;
        if (message) {
          dispatch(userSlice.actions.authFetchingError(message));
        }
      }
    }
  };

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <Text>{isAuth && user.email}</Text>
      <TouchableRipple onPress={() => navigation.navigate("Registration")}>
        <Text>Зарегистрироваться</Text>
      </TouchableRipple>
      <TouchableRipple onPress={() => navigation.navigate("Login")}>
        <Text>Войти</Text>
      </TouchableRipple>
      <TouchableRipple onPress={() => dispatch(fetchLogout())}>
        <Text>Выйти</Text>
      </TouchableRipple>
      <TouchableRipple onPress={() => getUsers()}>
        <Text>Получить пользователей</Text>
      </TouchableRipple>
      {users.length > 0 &&
        users.map((user) => {
          return (
            <View key={user.id}>
              <Text>{user.email}</Text>
            </View>
          );
        })}
    </View>
  );
};
