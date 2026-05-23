import { useController, useFormContext } from "react-hook-form";
import { Text, TouchableRipple, List } from "react-native-paper";
import { useState } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View, StyleSheet } from "react-native";
import { InputsUpdateTask } from "../Forms/models";

export interface CustomInputProps {
  rules?: {
    required: string;
  };
}

export const CustomTimeInput: React.FC<CustomInputProps> = ({
  rules,
}): React.JSX.Element => {
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const { control } = useFormContext<InputsUpdateTask>();
  const { field } = useController<InputsUpdateTask, "time">({
    control,
    rules,
    name: "time",
  });

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    field.onChange(selectedTime);
    setShowTimePicker(false);
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
              {field.value ? field.value.toLocaleTimeString("ru-RU", {
                hour: "numeric",
                minute: "numeric",
              }): ""}
            </Text>
          )}
        />
      </TouchableRipple>
      {showTimePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={field.value ? field.value : new Date()}
          mode="time"
          is24Hour={true}
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
