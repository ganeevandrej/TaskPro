import { Provider } from "react-redux";
import { store } from "./src/store/store";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { RootNavigationConatiner } from "./src/Navigation/RootContainer";
import ThemeProvider from "./src/contexts/theme-context";

const App: React.FC = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <ThemeProvider>
          <RootNavigationConatiner />
        </ThemeProvider>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
