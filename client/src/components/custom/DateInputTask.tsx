import { FieldValues, useController, useFormContext } from "react-hook-form";
import { TextInput, Text, TouchableRipple, List } from "react-native-paper";
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

export const CustomDateInputTask: React.FC<CustomInputProps> = ({
  name,
  rules,
}): React.JSX.Element => {
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, rules, name });

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    field.onChange(currentDate.toLocaleDateString());
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
      <TouchableRipple onPress={openDatePicker}>
        <List.Item
          style={{ justifyContent: "space-between" }}
          titleStyle={{ fontSize: 15, marginBottom: 5 }}
          title="Дата"
          left={(props) => <List.Icon {...props} icon="calendar" />}
          right={(props) => (
            <Text variant="bodyMedium" {...props}>
              {field.value}
            </Text>
          )}
        />
      </TouchableRipple>
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

const styles = StyleSheet.create({
  input: {
    // width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
