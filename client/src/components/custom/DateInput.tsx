import { useController, useFormContext } from "react-hook-form";
import { TextInput, Text, useTheme, List } from "react-native-paper";
import { useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View, StyleSheet } from "react-native";
import { createStyles } from "./TextInput";

export interface CustomInputProps {
  name: string;
  label: string;
  rules?: {
    required: string;
  };
}

export const CustomDateInput: React.FC<CustomInputProps> = ({
  name,
  label,
  rules,
}): React.JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { control } = useFormContext();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { field, fieldState } = useController({ control, rules, name });

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = (selectedDate || date);
    field.onChange(currentDate.toLocaleDateString());
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
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
        onFocus={openDatePicker}
        value={field.value}
        right={<TextInput.Icon onPress={openDatePicker} icon="calendar" />}
      />
      {showDatePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};
