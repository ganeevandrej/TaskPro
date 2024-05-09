import { MD3DarkTheme } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import React from "react";
import { SafeAreaView } from "react-native";
import { App } from "./App";
import "react-native-gesture-handler";

const RootComponent: React.FC = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <App />
      </SafeAreaView>
    </Provider>
  );
};

export default RootComponent;
