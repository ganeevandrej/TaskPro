import { View, StyleSheet, Dimensions } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, TouchableRipple, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchLogin } from "../../store/reducers/auth/ActionCreators";
import { useEffect } from "react";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { InputsLogin } from "./models";

const configFormLogin: UseFormProps<InputsLogin> = {
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
  },
};

export const FormLogin: React.FC = (): React.JSX.Element => {
  const methods = useForm<InputsLogin>(configFormLogin);
  const { isLoading, isAuth, error } = useAppSelector((state) => state.authReducer);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const { handleSubmit } = methods;

  const onSubmit = (fields: InputsLogin) => {
    dispatch(fetchLogin(fields));
  };

  useEffect(() => {
    if(isAuth) {
      navigation.navigate("Home");
    }
  }, [isAuth]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <FormProvider {...methods}>
      <Text>{error}</Text>
      <View style={styles.container}>
        <CustomInput 
          rules={{ required: "Обязательное поле!" }} 
          name="email" 
        />
        <CustomInput
          rules={{ required: "Обязательное поле!" }}
          name="password"
        />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Send
        </Button>
        <TouchableRipple onPress={() => navigation.navigate("Registration")}>
          <Text style={styles.link}>
            Новый пользователь? Зарегистрируйтесь здесь
          </Text>
        </TouchableRipple>
      </View>
    </FormProvider>
  );
};

const { width } = Dimensions.get("window");
const width_2 = width - 80;

const styles = StyleSheet.create({
  container: {
    width: width_2,
    marginHorizontal: 40,
    // marginTop: "50%",
  },
  link: {
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 20,
  },
});