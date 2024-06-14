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
  configureFonts,
} from "react-native-paper";
import merge from "deepmerge";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAuth } from "../store/reducers/auth/ActionCreators";
import { useAppDispatch } from "../hooks/redux";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

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
  const [fontsLoaded] = useFonts({
    NunitoSans: require("../../assets/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf"),
  });
  const fontConfig = {
    fontFamily: "NunitoSans",
  };
  let theme = isThemeDark
    ? { ...CombinedDarkTheme, fonts: configureFonts({ config: fontConfig }) }
    : {
        ...CombinedDefaultTheme,
        fonts: configureFonts({ config: fontConfig }),
      };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTheme = async () => {
      try{
        const isDarkTheme = await AsyncStorage.getItem("isDarkTheme");
        setIsThemeDark(isDarkTheme ? true : false);
        const accessToken = await AsyncStorage.getItem("accessToken");
        accessToken && await dispatch(checkAuth());
      } catch(e) {
        console.log(e);
      } finally {
        await SplashScreen.hideAsync();
      }
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
