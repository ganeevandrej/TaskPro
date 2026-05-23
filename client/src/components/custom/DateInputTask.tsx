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

export const CustomDateInputTask: React.FC<CustomInputProps> = ({
  rules,
}): React.JSX.Element => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { control } = useFormContext<InputsUpdateTask>();
  const { field } = useController<InputsUpdateTask, "date">({
    control,
    rules,
    name: "date",
  });

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    field.onChange(selectedDate);
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
              {field.value ? field.value.toLocaleDateString("ru-RU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) : ""}
            </Text>
          )}
        />
      </TouchableRipple>
      {showDatePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={field.value ? field.value : new Date()}
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
