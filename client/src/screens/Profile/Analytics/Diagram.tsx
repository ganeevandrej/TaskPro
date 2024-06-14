import { PieChart } from "react-native-chart-kit";
import { IAnalytics } from "../../../store/reducers/auth/AuthSlice";
import { Dimensions } from "react-native";

interface IDiagramProps {
    data: IAnalytics[]
}

const screenWidth = Dimensions.get("window").width;

export const Diagram: React.FC<IDiagramProps> = ({data}): React.JSX.Element => {
  return (
    <PieChart
      data={data}
      width={screenWidth - 50}
      height={130}
      chartConfig={{
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"-25"}
      center={[5, 0]}
    />
  );
};
