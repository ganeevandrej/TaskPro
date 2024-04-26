import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchLogout } from "../../store/reducers/auth/ActionCreators";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../NavigationContaners/DrawerContainer";
import { useEffect } from "react";
import { Header } from "../../components/Header";

export const SchedulerScreen = (): React.JSX.Element => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { isLoading, isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if(!isAuth) {
  //     navigation.navigate("Login");
  //   }
  // }, [isAuth])

  const logout = () => {
    dispatch(fetchLogout());
    // navigation.navigate("Login");
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Header navigation={navigation} />
      <Button mode="outlined" onPress={logout}>
        Выйти
      </Button>
    </View>
  );
};
