import { PaperProvider, MD3DarkTheme, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAuth } from "./src/store/reducers/auth/ActionCreators";
import { useAppDispatch } from "./src/hooks/redux";
import { RootNavigationConatiner } from "./src/NavigationContaners/RootContainer";
import ThemeProvider from "./src/contexts/theme-context";

export const App: React.FC = (): React.JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getInitialPage = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
          dispatch(checkAuth());
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    getInitialPage();
  }, []);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <ThemeProvider>
      <RootNavigationConatiner isLoggedIn={isLoggedIn} />
    </ThemeProvider>
  );
};

