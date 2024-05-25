import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, List, Text, useTheme } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { InputsCreateTask } from "./models";
import { CustomTimeInput } from "../custom/TimeInput";
import { CustomSelect } from "../custom/Select";
import { CustomDateInputTask } from "../custom/DateInputTask";
import { fetchCreateTask, fetchUpdateTask } from "../../store/reducers/taskManager/ActionCreators";

const configFormCreateTask: UseFormProps<InputsCreateTask> = {
  mode: "onBlur",
  defaultValues: {
    name: "",
    priority: 1,
    category: 1,
    time: "",
    date: ""
  },
};

export interface FormUpdateUserInfoProps {
  hideDialog: (flag: boolean) => void;
}

export const FormCreateTask: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
}): React.JSX.Element => {
  const methods = useForm<InputsCreateTask>(configFormCreateTask);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { isLoading, user } = useAppSelector(
    (state) => state.authReducer
  );
  const { categories, priorities } = useAppSelector(
    (state) => state.taskManagerReducer
  );

  const categoriesTransformSelect = categories.map(item => {
    return {
      label: item.name, 
      value: item.id, 
      key: item.id
    }
  });

  const prioritiesTransformSelect = priorities.map(item => {
    return {
      label: item.name, 
      value: item.id, 
      key: item.id
    }
  });

  const dataCategories = [
    { label: "Football", value: 1, key: 1 },
    { label: "Baseball", value: 2, key: 2 },
    { label: "Hockey", value: 3, key: 2 },
  ];
  
  const dataPriorities = [
    { label: "Низкий", value: 1, key: 1 },
    { label: "Средний", value: 2, key: 2 },
    { label: "Высокий", value: 3, key: 3 },
  ];

  const { handleSubmit, reset } = methods;

  const onSubmit = (fields: InputsCreateTask) => {
    const timeString = fields.time;
    const dateString = fields.date;

    const [hoursStr, minutesStr] = timeString.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const [dayStr, monthStr, yearStr] = dateString.split(".");
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const year = parseInt(yearStr, 10);

    const deadline = new Date(year, month, day, hours, minutes).toLocaleString();

    const body = {
      deadline: fields.time ? deadline : null,
      userId: user.id,
      name: fields.name,
      category: fields.category ? fields.category : 1,
      priority: fields.priority ? fields.priority : 1,
      createTask: new Date().toLocaleString(),
      status: "Активный"
    }

    dispatch(fetchCreateTask(body));
    reset();
    hideDialog(false);
  };

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <FormProvider {...methods}>
      <View>
        <CustomInput
          rules={{ required: "Обязательное поле!" }}
          name="name"
          label="Название задачи"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomSelect
            data={priorities.length > 0 ? prioritiesTransformSelect : dataPriorities}
            label="Приоритет"
            name="priority"
          />
          <CustomSelect
            data={categories.length > 0 ? categoriesTransformSelect : dataCategories}
            label="Категории"
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
            borderRadius: 10,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: colors.secondaryContainer,
          }}
        >
          <CustomDateInputTask
            name="date"
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: colors.secondaryContainer,
            marginTop: 5,
          }}
        >
          <CustomTimeInput
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
