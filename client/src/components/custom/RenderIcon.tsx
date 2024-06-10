import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export interface RenderIconProps {
  nameIcon: string;
  callback: () => void;
}

export const RenderIcon: React.FC<RenderIconProps> = ({
  nameIcon,
  callback,
}): React.JSX.Element => {
  return (
    <IconButton
      style={styles.headerLeft}
      icon={nameIcon}
      onPress={() => callback()}
    />
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 10,
  }
});
