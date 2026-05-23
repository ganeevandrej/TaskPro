import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { useTheme, Text, List } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { InputsForms } from "../models";
import { CustomSelect } from "../../custom/Select";
import React, { useState } from "react";
import { styles } from "./styles";
import { arrayTransformSelect } from "./halpers";
import { CustomButton } from "../../custom/Button";
import { CustomSegmentedButtons } from "../../custom/SegmentedButtons";
import { Filters } from "../../../screens/Scheduler";

const configFormFilters: UseFormProps<InputsForms> = {
  mode: "onBlur",
  defaultValues: {
    status: "",
    priority: 0,
    category: 0,
  },
};

export interface FormFiltersProps {
  hideDialog: () => void;
  setFilters: (filters: Filters) => void;
}

export const FormFilters: React.FC<FormFiltersProps> = ({
  hideDialog,
  setFilters,
}): React.JSX.Element => {
  const methods = useForm<InputsForms>(configFormFilters);
  const { categories, priorities } = useAppSelector(
    (state) => state.taskManagerReducer
  );

  const { handleSubmit } = methods;

  const dataPriority = arrayTransformSelect(priorities);
  const dataCategory = arrayTransformSelect(categories);

  const onSubmit = (fields: InputsForms) => {
    setFilters({
      status: fields.status,
      category: fields.category,
      priority: fields.priority,
    });
    hideDialog();
  };

  return (
    <FormProvider {...methods}>
      <View>
        <CustomSegmentedButtons name="status" />
        <View style={{ ...styles.row, marginTop: 20 }}>
          <Text variant="bodyLarge">Приоритет</Text>
          <CustomSelect data={dataPriority} label="Любой" name="priority" />
        </View>
        <View style={{ marginTop: 20, ...styles.row }}>
          <Text variant="bodyLarge">Категория</Text>
          <CustomSelect data={dataCategory} label="Все" name="category" />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton title="Отмена" callback={hideDialog} />
          <CustomButton title="Поиск" callback={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};
