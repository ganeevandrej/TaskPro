import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { List, useTheme } from "react-native-paper";
import { CustomInput } from "../../custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { InputsCreateTaskTechnique } from "../models";
import { CustomTimeInput } from "../../custom/TimeInput";
import { CustomSelect } from "../../custom/Select";
import { CustomDateInputTask } from "../../custom/DateInputTask";
import { CustomButton } from "../../custom/Button";
import { arrayTransformSelect } from "../Filters/halpers";
import { createStyles } from "./styles";
import { createBodyTechnique } from "../CreateTask/helpers";
import { createTaskTechniques } from "../../../store/reducers/techniques/ActionCreators";

const createConfigFormCreateTaskTechnique = (
  priority: number
): UseFormProps<InputsCreateTaskTechnique> => ({
  mode: "onBlur",
  defaultValues: {
    name: "",
    priority: priority,
    time: null,
    date: null,
  },
});

export interface FormUpdateUserInfoProps {
  hideDialog: () => void;
  technique: string;
  priority?: number;
}

export const FormCreateTaskTechnique: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
  technique,
  priority,
}): React.JSX.Element => {
  const methods = useForm<InputsCreateTaskTechnique>(
    createConfigFormCreateTaskTechnique(priority || 0)
  );
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { user } = useAppSelector((state) => state.authReducer);
  const { priorities } = useAppSelector((state) => state.taskManagerReducer);

  const dataPriorities = arrayTransformSelect(priorities);

  const { handleSubmit } = methods;

  const onSubmit = async (fields: InputsCreateTaskTechnique) => {
    const body = createBodyTechnique(fields, technique, user.id);
    dispatch(createTaskTechniques(body));
    hideDialog();
  };

  return (
    <FormProvider {...methods}>
      <View>
        <CustomInput name="name" label="Название задачи" />
        {!priority ? (
          <View style={styles.containerSelects}>
            <CustomSelect
              data={dataPriorities}
              label="Приоритет"
              name="priority"
            />
          </View>
        ) : (
          <></>
        )}
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
function createTask(body: {
  deadline: Date | null;
  userId: number | undefined;
  title: string;
  technique: string;
  priority: number;
  status: string;
}): any {
  throw new Error("Function not implemented.");
}
