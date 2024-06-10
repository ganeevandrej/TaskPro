import { useController, useFormContext } from "react-hook-form";
import { TextInput, Text, List, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { createStyles } from "./TextInput";

export interface CustomInputProps {
  name: string;
  label: string;
  rules?: {
    required: string;
  };
}

export const MyPhoneInput: React.FC<CustomInputProps> = ({
  name,
  label,
  rules,
}): React.JSX.Element => {
  const { control } = useFormContext();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { field } = useController({ control, rules, name });

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
        mode="outlined"
        outlineStyle={{ borderWidth: 0, borderRadius: 10 }}
        onBlur={field.onBlur}
        maxLength={11}
        onChangeText={field.onChange}
        value={field.value}
        keyboardType="phone-pad"
      />
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
