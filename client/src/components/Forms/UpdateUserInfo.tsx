import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateInfo } from "../../store/reducers/auth/ActionCreators";
import { InputsUpdateUserInfo } from "./models";
import { CustomDateInput } from "../custom/DateInput";
import { MyPhoneInput } from "../custom/PhoneInput";

const configFormUserInfo: UseFormProps<InputsUpdateUserInfo> = {
  mode: "onBlur",
  defaultValues: {
    phone: "",
    userName: "",
    dataBirth: "",
  },
};

export interface FormUpdateUserInfoProps {
  hideDialog: (flag: boolean) => void;
}

export const FormUpdateUserInfo: React.FC<FormUpdateUserInfoProps> = ({
  hideDialog,
}): React.JSX.Element => {
  const methods = useForm<InputsUpdateUserInfo>(configFormUserInfo);
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector(
    (state) => state.authReducer
  );

  const { handleSubmit, reset } = methods;

  const onSubmit = (fields: InputsUpdateUserInfo) => {
    dispatch(updateInfo(fields, user.id));
    reset();
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
          name="userName"
          label="Имя Пользователя"
        />
        <MyPhoneInput rules={{ required: "Обязательное поле!" }} name="phone" />
        <CustomDateInput
          rules={{ required: "Обязательное поле!" }}
          name="dataBirth"
        />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Сохранить
        </Button>
      </View>
    </FormProvider>
  );
};
