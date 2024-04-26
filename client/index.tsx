import { MD3DarkTheme } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { App } from "./App";
import 'react-native-gesture-handler';

const RootComponent: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 10,
        backgroundColor: MD3DarkTheme.colors.background,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaView>
  );
};

export default RootComponent;