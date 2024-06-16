import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Text } from "react-native-paper";
import { CustomInput } from "../custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { InputCreateCategory } from "./models";
import { fetchUpdateCategory } from "../../store/reducers/taskManager/ActionCreators";
import { CustomButton } from "../custom/Button";
import { styles } from "./Filters/styles";
import { ICategory } from "../../store/reducers/taskManager/TaskManagerSlice";

export interface FormCreateCategoryInfoProps {
  hideDialog: () => void;
  category: ICategory;
}

const createConfigFormUpdateCategory = (
  value: string
): UseFormProps<InputCreateCategory> => ({
  mode: "onBlur",
  defaultValues: {
    category: value,
  },
});

export const FormUpdateCategory: React.FC<FormCreateCategoryInfoProps> = ({
  hideDialog,
  category,
}): React.JSX.Element => {
  const methods = useForm<InputCreateCategory>(createConfigFormUpdateCategory(category.name));
  const { error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const { handleSubmit } = methods;

  const onSubmit = (fields: InputCreateCategory) => {
    dispatch(fetchUpdateCategory(category.id, fields.category));
    hideDialog();
  };

  return (
    <FormProvider {...methods}>
      {error && <Text>{error}</Text>}
      <View>
        <CustomInput name="category" label="Название категории" />
        <View style={styles.btnContainer}>
          <CustomButton title="Отмена" callback={hideDialog} />
          <CustomButton title="Сохранить" callback={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};
