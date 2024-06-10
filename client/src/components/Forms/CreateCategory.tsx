import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Text } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { InputCreateCategory } from "./models";
import { fetchCreateCategory } from "../../store/reducers/taskManager/ActionCreators";
import { CustomButton } from "../custom/Button";
import { styles } from "./Filters/styles";

export interface FormCreateCategoryInfoProps {
  hideDialog: () => void;
}

const configFormCreateCategory: UseFormProps<InputCreateCategory> = {
  mode: "onBlur",
  defaultValues: {
    category: "",
  },
};

export const FormCreateCategory: React.FC<FormCreateCategoryInfoProps> = ({
  hideDialog,
}): React.JSX.Element => {
  const methods = useForm<InputCreateCategory>(configFormCreateCategory);
  const { error, user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const { handleSubmit } = methods;

  const onSubmit = (fields: InputCreateCategory) => {
    dispatch(fetchCreateCategory(fields, user.id));
    hideDialog();
  };

  return (
    <FormProvider {...methods}>
      {error && <Text>{error}</Text>}
      <View>
        <CustomInput name="category" label="Название категории" />
        <View style={styles.btnContainer}>
          <CustomButton title="Отмена" callback={hideDialog} />
          <CustomButton title="Создать" callback={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};
