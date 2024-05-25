import { Provider } from "react-redux";
import { store } from "./src/store/store";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { App } from "./App";
import "react-native-gesture-handler";

const RootComponent: React.FC = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <App />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default RootComponent;
