import { View, StyleSheet, Dimensions } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, TouchableRipple, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CustomInput } from "../../components/custom/TextInput";
import { fetchRegistration } from "../../store/reducers/auth/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { Inputs } from "./models";

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

const { width } = Dimensions.get("window");
const width_2 = width - 80;

export const styles = StyleSheet.create({
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