import { FieldValues, useController, useFormContext } from "react-hook-form";
import { TextInput, Text } from "react-native-paper";
import { useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View, StyleSheet } from "react-native";

export interface CustomInputProps {
  name: string;
  rules: {
    required: string;
  };
}

export const CustomDateInput: React.FC<CustomInputProps> = ({
  name,
  rules,
}): React.JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, rules, name });

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = (selectedDate || date);
    setDate(currentDate);
    field.onChange(currentDate.toLocaleDateString());
    setShowDatePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        mode="outlined"
        onBlur={field.onBlur}
        label="Дата рождения"
        onFocus={showDatepicker}
        value={field.value}
        error={fieldState.invalid ? true : false}
        right={<TextInput.Icon onPress={showDatepicker} icon="calendar" />}
      />
      <Text>{fieldState.error?.message}</Text>
      {showDatePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
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
