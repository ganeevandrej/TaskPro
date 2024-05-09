import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, List, Text } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { InputsCreateTask } from "./models";
import { CustomTimeInput } from "../custom/TimeInput";
import { CustomSelect } from "../custom/Select";
import { CustomDateInputTask } from "../custom/DateInputTask";

const configFormCreateTask: UseFormProps<InputsCreateTask> = {
  mode: "onBlur",
  defaultValues: {
    name: "",
    description: "",
    priority: "Низкий",
    category: "",
  },
};

export interface FormUpdateUserInfoProps {
  hideDialog: (flag: boolean) => void;
}

const dataCategories = [
  { label: "Football", value: "football", key: "football" },
  { label: "Baseball", value: "baseball", key: "baseball" },
  { label: "Hockey", value: "hockey", key: "hockey" },
];

const dataPriorities = [
  { label: "Низкий", value: "Низкий", key: "Низкий" },
  { label: "Средний", value: "Средний", key: "Средний" },
  { label: "Высокий", value: "Высокий", key: "Высокий" },
];

export const FormCreateTask: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
}): React.JSX.Element => {
  const methods = useForm<InputsCreateTask>(configFormCreateTask);
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector(
    (state) => state.authReducer
  );

  const { handleSubmit, reset } = methods;

  const onSubmit = (fields: InputsCreateTask) => {
    console.log(fields);
    // dispatch(updateInfo(fields, user.id));
    // reset();
    hideDialog(false);
  };

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <FormProvider {...methods}>
      {/* <Text>hgjgdj</Text> */}
      <View>
        <CustomInput
          rules={{ required: "Обязательное поле!" }}
          name="name"
          label="Название задачи"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomSelect
            data={dataPriorities}
            label="Приоритет"
            rules={{ required: "Обязательное поле!" }}
            name="priority"
          />
          <CustomSelect
            data={dataCategories}
            label="Категории"
            rules={{ required: "Обязательное поле!" }}
            name="category"
          />
        </View>
        <List.Subheader style={{ paddingHorizontal: 0 }}>
          Укажите сроки выполнения
        </List.Subheader>
          <View
            style={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              // borderWidth: 1,
              borderRadius: 10,
              borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
              backgroundColor: "white"
            }}
          >
            <CustomDateInputTask
              rules={{ required: "Обязательное поле!" }}
              name="date"
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
              backgroundColor: "white",
              marginTop: 5
            }} 
          >
            <CustomTimeInput
              rules={{ required: "Обязательное поле!" }}
              name="time"
            />
            </View>
        <Button
          style={{ marginTop: 20 }}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Создать
        </Button>
      </View>
    </FormProvider>
  );
};
