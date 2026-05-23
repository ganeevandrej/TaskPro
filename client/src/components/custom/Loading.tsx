import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

interface ILoadingProps {
  marginTop: number;
}

export const Loading: React.FC<ILoadingProps> = ({marginTop}) => {
  return (
    <View style={{marginVertical: marginTop}}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};
