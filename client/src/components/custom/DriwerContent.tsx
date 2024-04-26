import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useState } from "react";
import { Drawer } from "react-native-paper";


export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const [active, setActive] = useState("");
  
    return (
      <Drawer.Section title="Ганеев Андрей">
        <Drawer.Item
          label="Категории"
          active={active === "first"}
          onPress={() => {
            setActive("first");
            props.navigation.navigate("Categories");
          }}
        />
        <Drawer.Item
          label="Уведомления"
          active={active === "second"}
          onPress={() => {
            setActive("second");
            props.navigation.navigate("Notification");
          }}
        />
      </Drawer.Section>
    );
  }