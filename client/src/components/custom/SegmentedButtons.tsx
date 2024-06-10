import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { List, SegmentedButtons } from "react-native-paper";

interface CustomSegmentedButtonsProps {
  name: string;
}

export const CustomSegmentedButtons: React.FC<
  CustomSegmentedButtonsProps
> = ({name}): React.JSX.Element => {
  const { control } = useFormContext();
  const { field } = useController({ control, name });

  return (
    <>
      <List.Subheader style={{ paddingHorizontal: 0 }}>Статус</List.Subheader>
      <SegmentedButtons
        value={field.value}
        onValueChange={field.onChange}
        buttons={[
          {
            value: "Просрочена",
            icon: "alert-remove",
          },
          { value: "Завершена", icon: "check" },
          {
            value: "Активная",
            icon: "progress-question",
          },
        ]}
      />
    </>
  );
};
