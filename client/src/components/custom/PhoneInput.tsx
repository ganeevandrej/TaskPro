import { useController, useFormContext } from "react-hook-form";
import { TextInput, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useState } from "react";

export interface CustomInputProps {
  name: string;
  rules: {
    required: string;
  };
}

export const MyPhoneInput: React.FC<CustomInputProps> = ({
  name,
  rules,
}): React.JSX.Element => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, rules, name });

  return (
    <View>
      <TextInput
        style={styles.input}
        mode="outlined"
        onBlur={field.onBlur}
        label="Номер телефона"
        maxLength={11}
        onChangeText={field.onChange}
        value={field.value}
        keyboardType="phone-pad"
        error={fieldState.invalid ? true : false}
      />
      <Text>{fieldState.error?.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
