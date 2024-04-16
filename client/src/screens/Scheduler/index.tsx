import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
// import { RootStackParamList } from "../../../App";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  checkAuth,
  fetchLogout,
} from "../../store/reducers/auth/ActionCreators";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const Tab = createMaterialBottomTabNavigator();

export const SchedulerScreen: React.FC = (): React.JSX.Element => {
  // const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isLoading, error, user, isAuth } = useAppSelector(
    (state) => state.authReducer
  );
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const refresh = async () => {
  //     const accessToken = await AsyncStorage.getItem("accessToken");

  //     if (accessToken) {
  //       dispatch(checkAuth());
  //     } else {
  //       navigation.navigate("Login");
  //     }
  //   };

  //   refresh();
  // }, []);

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigation.navigate("Login");
  //   }
  // }, [isAuth]);

  // if (isLoading) {
  //   return <Text>Loading</Text>;
  // }

  return (
    <View>
      <TouchableRipple onPress={() => dispatch(fetchLogout())}>
        <Text>Выйти</Text>
      </TouchableRipple>
    </View>
  );
};
