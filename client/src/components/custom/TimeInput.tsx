import { FieldValues, useController, useFormContext } from "react-hook-form";
import { TextInput, Text, TouchableRipple, List } from "react-native-paper";
import { useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View, StyleSheet } from "react-native";

export interface CustomInputProps {
  name: string;
  rules?: {
    required: string;
  };
}

export const CustomTimeInput: React.FC<CustomInputProps> = ({
  name,
  rules,
}): React.JSX.Element => {
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const { control } = useFormContext();
  const { field, fieldState } = useController({ control, rules, name });

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime) {
      const currentDate = selectedTime || time;
      setTime(currentDate);
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      field.onChange(`${hours}:${minutes}`);
      setShowTimePicker(false);
    }
  };

  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableRipple onPress={openTimePicker}>
        <List.Item
          titleStyle={{ fontSize: 15, marginBottom: 5 }}
          title="Время"
          left={(props) => (
            <List.Icon {...props} icon="clock-time-five-outline" />
          )}
          right={(props) => (
            <Text variant="bodyMedium" {...props}>
              {field.value}
            </Text>
          )}
        />
      </TouchableRipple>
      {showTimePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          // is24Hour={true}
          display="spinner"
          onChange={onChangeTime}
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
