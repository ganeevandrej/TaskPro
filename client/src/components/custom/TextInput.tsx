import { useController, useFormContext } from "react-hook-form";
import { TextInput, Text } from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export interface CustomInputProps {
  name: string;
  rules: {
    required: string;
  };
}

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  rules,
}): React.JSX.Element => {
  const [isIconShowPassword, setIconShowPassword] = useState(true);
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, rules, name });
  const isSecureText = field.name.indexOf("password") !== -1;

  const changeIcon = () => {
    setIconShowPassword((prev) => !prev);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        mode="outlined"
        onBlur={field.onBlur}
        label={field.name}
        onChangeText={field.onChange}
        value={field.value}
        error={fieldState.invalid ? true : false}
        secureTextEntry={isSecureText && isIconShowPassword}
        right={
          isSecureText && (
            <TextInput.Icon
              icon={isIconShowPassword ? "eye-outline" : "eye-off-outline"}
              onPress={changeIcon}
            />
          )
        }
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
