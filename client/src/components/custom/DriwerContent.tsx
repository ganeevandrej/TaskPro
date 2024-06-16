import { useState } from "react";
import {
  Avatar,
  Drawer,
  Icon,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { FlatList, View } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import { ScrollView } from "react-native-virtualized-view";
import { ICategory } from "../../store/reducers/taskManager/TaskManagerSlice";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

interface CustomDrawerContentProps {
  navigation: DrawerNavigationHelpers;
}

export function CustomDrawerContent({ navigation }: CustomDrawerContentProps) {
  const [active, setActive] = useState("Планировщик");
  const { avatar, user } = useAppSelector((state) => state.authReducer);
  const { categories } = useAppSelector((state) => state.taskManagerReducer);
  const [expanded, setExpanded] = useState<boolean>(false);
  const { colors } = useTheme();

  const categoriesFilter = categories.filter(
    (category) => category.name !== "Планировщик"
  );

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const renderItem = ({ item }: { item: ICategory }) => {

    const onPressCategory = (name: string) => {
      setActive(name);
      navigation.navigate("Category", {title: name});
    }

    return (
      <View
        style={{
          borderRadius: 50,
          paddingHorizontal: 35,
          backgroundColor:
            active === item.name ? colors.secondaryContainer : "transparent",
        }}
      >
        <TouchableRipple onPress={() => onPressCategory(item.name)}>
          <Text style={{ paddingVertical: 15 }} variant="titleSmall">
            {item.name}
          </Text>
        </TouchableRipple>
      </View>
    );
  };

  return (
    <View>
      <Drawer.Section style={{ paddingVertical: 20 }}>
        <TouchableRipple
          onPress={() => navigation.navigate("Profile", { screen: "Профиль" })}
        >
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Avatar.Image
              style={{ backgroundColor: "transparent" }}
              size={125}
              source={
                avatar
                  ? { uri: avatar }
                  : require("../../../assets/empty-avatar.jpg")
              }
            />
            <Text style={{ marginTop: 20 }} variant="titleLarge">
              {user.name ? user.name : "Гость"}
            </Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <Drawer.Section showDivider={false} style={{ marginBottom: 0 }}>
        <Drawer.Item
          label="Техники"
          active={active === "Техники"}
          icon="lightbulb-on"
          onPress={() => {
            setActive("Техники");
            navigation.navigate("Techniques", { screen: "Техники" });
          }}
        />
        <Drawer.Item
          label="Планировщик"
          active={active === "Планировщик"}
          icon="clock"
          onPress={() => {
            setActive("Планировщик");
            navigation.navigate("Scheduler", { screen: "Планировщик" });
          }}
        />
        <Drawer.Item
          label="Уведомления"
          active={active === "Уведомления"}
          icon="bell"
          onPress={() => {
            setActive("Уведомления");
            navigation.navigate("Notification", {
              screen: "Уведомления",
            });
          }}
        />
        <TouchableRipple onPress={toggleAccordion}>
          <View
            style={{
              marginHorizontal: 15,
              flexDirection: "row",
              paddingHorizontal: 15,
              paddingVertical: 15,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                source="format-list-bulleted"
                color={colors.onSurfaceVariant}
                size={24}
              />
              <Text
                variant="titleSmall"
                style={{ marginLeft: 10, color: colors.onSurfaceVariant }}
              >
                Категории
              </Text>
            </View>
            <View>
              <Icon
                source={expanded ? "chevron-down" : "chevron-left"}
                size={15}
              />
            </View>
          </View>
        </TouchableRipple>

        {expanded && (
          <ScrollView style={{ marginHorizontal: 30 }}>
            <FlatList
              data={categoriesFilter}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
            />
          </ScrollView>
        )}
      </Drawer.Section>
    </View>
  );
}
