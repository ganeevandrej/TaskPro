import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { View, StyleSheet  } from "react-native";
import { Icon, useTheme } from "react-native-paper";

export type ItemSelect = {
  label: string;
  value: number;
  key: number;
};

export interface CustomInputProps {
  name: string;
  label?: string;
  rules?: {
    required: string;
  };
  data: ItemSelect[];
}

export const CustomSelect: React.FC<CustomInputProps> = ({
  label,
  data,
  rules,
  name,
}) => {
  const [value, setValue] = useState<number>(1);
  const { control } = useFormContext();
  const { colors } = useTheme();
  const { field, fieldState } = useController({ control, rules, name });

  const changeValueSelect = (value: number) => {
    field.onChange(value);
    setValue(value);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        style={{inputAndroid: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 8,
          // borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 8,
          paddingRight: 30,
          backgroundColor: colors.secondaryContainer
        }}}
        onValueChange={changeValueSelect}
        useNativeAndroidPickerStyle={false}
        Icon={(props) => (
          <View style={styles.iconContainer}>
            <Icon source="chevron-down" {...props} size={20} />
          </View>
        )}
        placeholder={{ label: label }}
        value={value}
        items={data}
      />
    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 5, // Отступ справа от иконки,
    marginTop: 15
  },
});

const pickerSelectStyles = StyleSheet.create({
  // inputAndroid: {
  //   fontSize: 16,
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   // borderWidth: 1,
  //   borderColor: 'gray',
  //   borderRadius: 8,
  //   paddingRight: 30,
  //   backgroundColor: colors.secondaryContainer
  // },
});
