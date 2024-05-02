import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchLogout } from "../../store/reducers/auth/ActionCreators";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { useEffect } from "react";
import { Header } from "../../components/Header";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";

export const SchedulerScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const nav = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { isLoading, isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchLogout());
  // }, [])

  // useEffect(() => {
  //   if(!isAuth) {
  //     navigation.navigate("Login");
  //   }
  // }, [isAuth])

  const logout = () => {
    dispatch(fetchLogout());
    navigation.navigate("Login");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Header navigation={nav} />
      <Button mode="outlined" onPress={logout}>
        Выйти
      </Button>
    </View>
  );
};
