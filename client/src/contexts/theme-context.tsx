import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import merge from "deepmerge";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAuth } from "../store/reducers/auth/ActionCreators";
import { useAppDispatch } from "../hooks/redux";
import * as SplashScreen from "expo-splash-screen";

interface ThemeContextType {
  isThemeDark: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

SplashScreen.preventAutoHideAsync();

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export const ThemeContext = createContext<ThemeContextType>({
  isThemeDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}): React.JSX.Element => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const dispatch = useAppDispatch();


  useEffect(() => {
    const getTheme = async () => {
      const isDarkTheme = await AsyncStorage.getItem("isDarkTheme");
      const accessToken = await AsyncStorage.getItem("accessToken");

      accessToken && (await dispatch(checkAuth()));
      setIsThemeDark(isDarkTheme ? true : false);
      await SplashScreen.hideAsync();
    };

    getTheme();
  });

  const toggleTheme = useCallback(async () => {
    await AsyncStorage.setItem("isDarkTheme", isThemeDark ? "" : "true");
    setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
