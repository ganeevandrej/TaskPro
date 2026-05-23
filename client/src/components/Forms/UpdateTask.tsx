import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { List, useTheme } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { InputsCreateTask, InputsUpdateTask } from "./models";
import { CustomTimeInput } from "../custom/TimeInput";
import { CustomSelect } from "../custom/Select";
import { CustomDateInputTask } from "../custom/DateInputTask";
import { fetchUpdateTask } from "../../store/reducers/taskManager/ActionCreators";
import { createBody } from "./CreateTask/helpers";
import { arrayTransformSelect, findItemIdByName } from "./Filters/halpers";
import { createStyles } from "./CreateTask/styles";
import { CustomButton } from "../custom/Button";
import { ITask } from "../../store/reducers/taskManager/TaskManagerSlice";

const creatConfigFormUpdateTask = (
  task: ITask,
  priority: number,
  category: number
): UseFormProps<InputsUpdateTask> => {
  return {
    mode: "onBlur",
    defaultValues: {
      name: task.name,
      priority: priority,
      category: category,
      time: task.deadline && new Date(task.deadline),
      date: task.deadline && new Date(task.deadline),
    },
  };
};

export interface FormUpdateUserInfoProps {
  hideDialog: () => void;
  task: ITask;
  category?: number;
}

export const FormUpdateTask: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
  task,
  category,
}): React.JSX.Element => {
  const { categories, priorities } = useAppSelector(
    (state) => state.taskManagerReducer
  );
  const priorityId = findItemIdByName(priorities, task.priority);
  const categoryId = category || findItemIdByName(categories, task.category);
  const methods = useForm<InputsUpdateTask>(
    creatConfigFormUpdateTask(task, priorityId, categoryId)
  );
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { handleSubmit, reset } = methods;

  const dataPriorities = arrayTransformSelect(priorities);
  const dataCategories = arrayTransformSelect(categories);

  const onSubmit = (fields: InputsUpdateTask) => {
    const body = createBody(fields);
    dispatch(fetchUpdateTask(body, task.id));
    reset();
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
          <CustomButton title="Сохранить" callback={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};
