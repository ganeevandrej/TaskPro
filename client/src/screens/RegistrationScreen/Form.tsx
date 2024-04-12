import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, TouchableRipple, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { CustomInput } from "../../components/custom/TextInput";
import { fetchRegistration } from "../../store/reducers/auth/ActionCreators";
import { styles } from "./styles";
import { WithErrorAndLoadingProps, withErrorAndLoading } from "../../HOKs/withErrorAndLoading ";
import { userSlice } from "../../store/reducers/auth/AuthSlice";

export interface Inputs {
  email: string;
  password: string;
  passwordRepeat: string;
}

const configFormRegistration: UseFormProps<Inputs> = {
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
    passwordRepeat: "",
  },
};

const FormRegistration: React.FC<WithErrorAndLoadingProps> = ({
  error,
  dispatch,
}): React.JSX.Element => {
  const methods = useForm<Inputs>(configFormRegistration);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { handleSubmit, reset } = methods;

  const onSubmit = ({ email, password, passwordRepeat }: Inputs) => {
    if (password === passwordRepeat) {
      dispatch(userSlice.actions.authFetchingError(""));
      dispatch(fetchRegistration(email, password));
      // navigation.navigate("Scheduler");
    } else {
      dispatch(userSlice.actions.authFetchingError("Пароли не совпадают!"));
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text>{error}</Text>
        <CustomInput rules={{ required: "Обязательное поле!" }} name="email" />
        <CustomInput
          rules={{ required: "Обязательное поле!" }}
          name="password"
        />
        <CustomInput
          rules={{ required: "Обязательное поле!" }}
          name="passwordRepeat"
        />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Send
        </Button>
        <TouchableRipple onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>
            Уже сеть аккаунт? Войдите в приложение
          </Text>
        </TouchableRipple>
      </View>
    </FormProvider>
  );
};

export default withErrorAndLoading(FormRegistration);