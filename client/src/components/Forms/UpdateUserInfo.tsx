import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateInfo } from "../../store/reducers/auth/ActionCreators";
import { InputsUpdateUserInfo } from "./models";
import { CustomDateInput } from "../custom/DateInput";
import { MyPhoneInput } from "../custom/PhoneInput";
import { CustomButton } from "../custom/Button";
import { styles } from "./Filters/styles";

const configFormUserInfo: UseFormProps<InputsUpdateUserInfo> = {
  mode: "onBlur",
  defaultValues: {
    phone: "",
    userName: "",
    dataBirth: "",
  },
};

export interface FormUpdateUserInfoProps {
  hideDialog: () => void;
}

export const FormUpdateUserInfo: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
}): React.JSX.Element => {
  const methods = useForm<InputsUpdateUserInfo>(configFormUserInfo);
  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector((state) => state.authReducer);

  const { handleSubmit, reset } = methods;

  const onSubmit = (fields: InputsUpdateUserInfo) => {
    dispatch(updateInfo(fields, user.id));
    reset();
    hideDialog();
  };

  return (
    <FormProvider {...methods}>
      <View>
        <CustomInput name="userName" label="Имя Пользователя" />
        <MyPhoneInput label="Номер телефона" name="phone" />
        <CustomDateInput label="Дата рождения" name="dataBirth" />
        <View style={styles.btnContainer}>
          <CustomButton title="Отмена" callback={hideDialog} />
          <CustomButton title="Сохранить" callback={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};
