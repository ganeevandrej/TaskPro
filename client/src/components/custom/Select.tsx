import { useController, useFormContext } from "react-hook-form";
import RNPickerSelect from "react-native-picker-select";
import { View, StyleSheet } from "react-native";
import { Icon, useTheme as useThemePaper } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { useTheme } from "../../contexts/theme-context";

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
  const { control } = useFormContext();
  const { colors } = useThemePaper();
  const { isThemeDark } = useTheme();
  const stylesPicker = createPickerSelectStyles(colors, isThemeDark);
  const { field } = useController({ control, rules, name });

  const changeValueSelect = (value: number) => {
    field.onChange(value);
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        style={stylesPicker}
        onValueChange={changeValueSelect}
        useNativeAndroidPickerStyle={false}
        Icon={(props) => (
          <View style={styles.iconContainer}>
            <Icon source="chevron-down" {...props} size={20} />
          </View>
        )}
        placeholder={{ label: label }}
        value={field.value}
        items={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 5,
    marginTop: 15,
  },
});

const createPickerSelectStyles = (colors: MD3Colors, isDarkTheme: boolean) => StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "NunitoSans",
    fontWeight: "600",
    borderColor: "gray",
    borderRadius: 8,
    paddingRight: 30,
    backgroundColor: colors.secondaryContainer,
    color: colors.inverseSurface,
  },
  placeholder: {
    color: !isDarkTheme ? "#333333" : "#CCCCCC"
  }
});
