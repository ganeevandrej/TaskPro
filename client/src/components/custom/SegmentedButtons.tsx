import { useState } from "react";
import { SegmentedButtons } from "react-native-paper";

export const CustomSegmentedButtons = () => {
    const [value, setValue] = useState<string>("Низкий");
    
    return (
        <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "Низкий",
            label: "Низкий",
          },
          {
            value: "Средний",
            label: "Средний",
          },
          { value: "Высокий", label: "Высокий" },
        ]}
      />
    );
}