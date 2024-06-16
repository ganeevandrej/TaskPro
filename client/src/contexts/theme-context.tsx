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
  Theme,
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
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light_Italic,
  Nunito_400Regular_Italic,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black_Italic,
} from "@expo-google-fonts/nunito";

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
  let [fontsLoaded] = useFonts({
    NunitoSans: Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
  });
  const dispatch = useAppDispatch();

  useEffect(
    useCallback(() => {
      const getTheme = async () => {
        try {
          const isDarkTheme = await AsyncStorage.getItem("isDarkTheme");
          setIsThemeDark(isDarkTheme ? true : false);
          const accessToken = await AsyncStorage.getItem("accessToken");
          accessToken && (await dispatch(checkAuth()));
        } catch (e) {
          console.log(e);
        } finally {
          await SplashScreen.hideAsync();
        }
      };

      getTheme();
    }, []),
    []
  );

  const fontConfig = {
    fontFamily: "NunitoSans",
  };
  let theme = isThemeDark
    ? { ...CombinedDarkTheme, fonts: configureFonts({ config: fontConfig }) }
    : {
        ...CombinedDefaultTheme,
        fonts: configureFonts({ config: fontConfig }),
      };

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
      <PaperProvider theme={fontsLoaded ? theme : undefined}>
        <NavigationContainer theme={fontsLoaded ? theme : undefined}>{children}</NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
