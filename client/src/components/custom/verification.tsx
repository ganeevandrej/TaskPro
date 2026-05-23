import React from "react";
import { View, StyleSheet } from "react-native";
import {Text} from "react-native-paper";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

export interface IVerificationProps {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}

export const Verification: React.FC<IVerificationProps> = ({value, setValue}): React.JSX.Element => {
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.container}>
      <Text>Введите код для активации аккуанта</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text>{symbol || (isFocused ? <Cursor /> : null)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  codeFiledRoot: {
    marginTop: 20,
    width: "100%",
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#000",
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
});
