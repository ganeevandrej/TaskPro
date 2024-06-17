import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { List, useTheme } from "react-native-paper";
import { CustomInput } from "../../custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { InputsCreateTask } from "../models";
import { CustomTimeInput } from "../../custom/TimeInput";
import { CustomSelect } from "../../custom/Select";
import { CustomDateInputTask } from "../../custom/DateInputTask";
import { fetchCreateTask } from "../../../store/reducers/taskManager/ActionCreators";
import { CustomButton } from "../../custom/Button";
import { arrayTransformSelect } from "../Filters/halpers";
import { createBody } from "./helpers";
import { createStyles } from "./styles";

const createConfigFormCreateTask = (
  category: number
): UseFormProps<InputsCreateTask> => ({
  mode: "onBlur",
  defaultValues: {
    name: "",
    priority: 0,
    category: category,
    time: null,
    date: null,
  },
});

export interface FormUpdateUserInfoProps {
  hideDialog: () => void;
  category?: number;
}

export const FormCreateTask: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
  category,
}): React.JSX.Element => {
  const categoryId = category || 0;
  const methods = useForm<InputsCreateTask>(createConfigFormCreateTask(categoryId));
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { user } = useAppSelector((state) => state.authReducer);
  const { categories, priorities } = useAppSelector(
    (state) => state.taskManagerReducer
  );

  const dataPriorities = arrayTransformSelect(priorities);
  const dataCategories = arrayTransformSelect(categories);

  const { handleSubmit } = methods;

  const onSubmit = async (fields: InputsCreateTask) => {
    const body = createBody(fields, user.id);
    dispatch(fetchCreateTask(body));
    hideDialog();
  };

  return (
    <FormProvider {...methods}>
      <View>
        <CustomInput name="name" label="Название задачи" />
        <View style={styles.containerSelects}>
          <CustomSelect
            data={dataPriorities}
            label="Приоритет"
            name="priority"
          />
          {!category ? (
            <CustomSelect
              data={dataCategories}
              label="Категории"
              name="category"
            />
          ) : (
            <></>
          )}
        </View>
        <List.Subheader style={{ paddingHorizontal: 0 }}>
          Укажите сроки выполнения
        </List.Subheader>
        <View style={styles.containerDateInput}>
          <CustomDateInputTask />
        </View>
        <View style={styles.containerTimeInput}>
          <CustomTimeInput />
        </View>
        <View style={styles.btnContainer}>
          <CustomButton title="Отмена" callback={hideDialog} />
          <CustomButton title="Создать" callback={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};
