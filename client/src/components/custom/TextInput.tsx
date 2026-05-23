import { useController, useFormContext } from "react-hook-form";
import { TextInput, Text, useTheme, List } from "react-native-paper";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export interface CustomInputProps {
  name: string;
  label?: string;
  rules?: {
    required?: string;
  };
}

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  rules,
  label,
}): React.JSX.Element => {
  const [isIconShowPassword, setIconShowPassword] = useState(true);
  const { control } = useFormContext();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { field } = useController({ control, rules, name });
  const isSecureText = field.name.indexOf("password") !== -1;

  const changeIcon = () => {
    setIconShowPassword((prev) => !prev);
  };

  return (
    <View>
      <List.Subheader style={styles.label}>
        {label}
        <Text style={styles.after} variant="bodyMedium">
          {" "}
          *
        </Text>
      </List.Subheader>
      <TextInput
        style={styles.input}
        outlineStyle={{ borderWidth: 0, borderRadius: 10 }}
        mode="outlined"
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        secureTextEntry={isSecureText && isIconShowPassword}
        right={
          isSecureText && (
            <TextInput.Icon
              icon={isIconShowPassword ? "eye-off-outline" : "eye-outline"}
              onPress={changeIcon}
            />
          )
        }
      />
    </View>
  );
};

export const createStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    input: {
      width: "100%",
      backgroundColor: colors.secondaryContainer,
      paddingVertical: 0
    },
    label: {
      marginLeft: -15,
    },
    after: {
      color: colors.error,
    },
  }
);
