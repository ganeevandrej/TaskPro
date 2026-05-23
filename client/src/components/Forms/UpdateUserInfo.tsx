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
import { IUser } from "../../models/IUser";

const createConfigFormUserInfo = (user: IUser): UseFormProps<InputsUpdateUserInfo> => ({
  mode: "onBlur",
  defaultValues: {
    phone: user.phone || "",
    userName: user.name || "",
    dataBirth: user.dateBirth || "",
  },
});

export interface FormUpdateUserInfoProps {
  hideDialog: () => void;
}

export const FormUpdateUserInfo: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
}): React.JSX.Element => {
  const user = useAppSelector(state => state.authReducer.user);
  const methods = useForm<InputsUpdateUserInfo>(createConfigFormUserInfo(user));
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.authReducer);

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
        <MyPhoneInput label="Номер телефона" user={user} name="phone" />
        <CustomDateInput label="Дата рождения" name="dataBirth" />
        <View style={styles.btnContainer}>
          <CustomButton title="Отмена" callback={hideDialog} />
          <CustomButton title="Сохранить" callback={handleSubmit(onSubmit)} />
        </View>
      </View>
    </FormProvider>
  );
};
