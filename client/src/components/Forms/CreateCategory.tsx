import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { InputCreateCategory } from "./models";
import { fetchCreateCategory } from "../../store/reducers/taskManager/ActionCreators";

export interface FormCreateCategoryInfoProps {
  hideDialog: (flag: boolean) => void;
}

const configFormCreateCategory: UseFormProps<InputCreateCategory> = {
  mode: "onBlur",
  defaultValues: {
    category: "",
  },
};

export const FormCreateCategory: React.FC<FormCreateCategoryInfoProps> = ({hideDialog}): React.JSX.Element => {
  const methods = useForm<InputCreateCategory>(configFormCreateCategory);
  const { isLoading, error, user } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const { handleSubmit } = methods;

  const onSubmit = (fields: InputCreateCategory) => {
    dispatch(fetchCreateCategory(fields, user.id));
    hideDialog(false);
  };

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <FormProvider {...methods}>
      <Text>{error}</Text>
      <View>
        <CustomInput 
          rules={{ required: "Обязательное поле!" }} 
          name="category"
        />
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
        <Button mode="contained" style={{marginRight: 10}} onPress={() => hideDialog(false)}>
          Отмена
        </Button>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Создать
        </Button>
        </View>
      </View>
    </FormProvider>
  );
};