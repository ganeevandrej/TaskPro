import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, TouchableRipple, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { CustomInput } from "../../components/custom/TextInput";
import { fetchRegistration } from "../../store/reducers/auth/ActionCreators";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";

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

export const FormRegistration: React.FC = (): React.JSX.Element => {
  const { isLoading, error, user } = useAppSelector((state) => state.authReducer);
  const methods = useForm<Inputs>(configFormRegistration);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const { handleSubmit, reset } = methods;

  const onSubmit = (fields: Inputs) => {
    dispatch(fetchRegistration(fields));
  };

  useEffect(() => {
    if(user.id) {
      navigation.navigate("Home");
    }
    
  }, [user]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

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
