import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

export const Loading = () => {
  return (
    <View style={{marginVertical: 25}}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};
