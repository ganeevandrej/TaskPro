import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { List, useTheme } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { InputsUpdateTaskTechnique } from "./models";
import { CustomTimeInput } from "../custom/TimeInput";
import { CustomSelect } from "../custom/Select";
import { CustomDateInputTask } from "../custom/DateInputTask";
import { arrayTransformSelect, findItemIdByName } from "./Filters/halpers";
import { createStyles } from "./CreateTask/styles";
import { CustomButton } from "../custom/Button";
import { ITaskTechnique } from "../../store/reducers/techniques/TechniquesSlice";
import { updateTaskTechniques } from "../../store/reducers/techniques/ActionCreators";
import { createBodyTechnique } from "./CreateTask/helpers";

const creatConfigFormUpdateTaskTechniques = (
  task: ITaskTechnique,
  priority: number,
): UseFormProps<InputsUpdateTaskTechnique> => {
  return {
    mode: "onBlur",
    defaultValues: {
      name: task.title,
      priority: priority,
      time: task.deadline && new Date(task.deadline),
      date: task.deadline && new Date(task.deadline),
    },
  };
};

export interface FormUpdateUserInfoProps {
  hideDialog: () => void;
  task: ITaskTechnique;
  technique: string;
}

export const FormUpdateTaskTechnique: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
  task,
  technique,
}): React.JSX.Element => {
  const { priorities } = useAppSelector(
    (state) => state.taskManagerReducer
  );
  const priorityId = findItemIdByName(priorities, task.priority);
  const methods = useForm<InputsUpdateTaskTechnique>(
    creatConfigFormUpdateTaskTechniques(task, priorityId)
  );
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { handleSubmit, reset } = methods;

  const dataPriorities = arrayTransformSelect(priorities);

  const onSubmit = (fields: InputsUpdateTaskTechnique) => {
    const body = createBodyTechnique(fields, technique);
    dispatch(updateTaskTechniques(body, task.id));
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
