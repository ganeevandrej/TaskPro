import { useState } from "react";
import { StyleSheet } from "react-native";
import { List, ToggleButton } from "react-native-paper";

export const Sort = () => {
  const [value, setValue] = useState("left");

  return (
    <List.Section>
      <List.Subheader>Сортировка</List.Subheader>
      <ToggleButton.Row
        style={styles.toggleButton}
        onValueChange={(value) => setValue(value)}
        value={value}
      >
        <ToggleButton icon="sort-calendar-ascending" value="left" />
        <ToggleButton icon="sort-calendar-descending" value="right" />
      </ToggleButton.Row>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
