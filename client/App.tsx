import { Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAuth } from "./src/store/reducers/auth/ActionCreators";
import { useAppDispatch } from "./src/hooks/redux";
import { RootNavigationConatiner } from "./src/Navigation/RootContainer";
import ThemeProvider from "./src/contexts/theme-context";

export const App: React.FC = (): React.JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getInitialPage = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        
        if (accessToken) {
          dispatch(checkAuth());
          setIsLoggedIn(true);
          setError("");
        } else {
          setError("Авторизиционный токен не найден!");
        }
      } catch {
        setError("Что-то пошло не так!");
      } finally {
        setIsLoading(false);
      }
    };

    getInitialPage();
  }, []);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if(error) {
    return <Text>{error}</Text>;
  }

  return (
    <ThemeProvider>
      <RootNavigationConatiner isLoggedIn={isLoggedIn} />
    </ThemeProvider>
  );
};

