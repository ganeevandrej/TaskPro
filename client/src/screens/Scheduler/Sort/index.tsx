import { StyleSheet, View } from "react-native";
import { List, ToggleButton, TouchableRipple, Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { CustomButton } from "../../../components/custom/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackShedulerParamList } from "../../../Navigation/models";

export interface SortProps {
  value: string;
  setValue: (value: string) => void;
}

export const Sort: React.FC<SortProps> = ({
  value,
  setValue,
}): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<StackShedulerParamList>>();

  return (
    <List.Section style={{ marginTop: -15 }}>
      <List.Subheader>Сортировка</List.Subheader>
      <View style={{flexDirection: "row", justifyContent: "space-between", marginRight: 20}}>
        <ToggleButton.Row
          style={styles.toggleButton}
          onValueChange={(value) => setValue(value)}
          value={value}
        >
          <ToggleButton icon="sort-calendar-ascending" value="ASC" />
          <ToggleButton icon="sort-calendar-descending" value="DESC" />
        </ToggleButton.Row>
        <CustomButton title="К категориям" callback={() => navigation.navigate("Categories")} />
      </View>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    marginLeft: 20,
    flexDirection: "row",
  },
});
