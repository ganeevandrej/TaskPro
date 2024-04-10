import { View, StyleSheet, Dimensions } from "react-native";
import { CustomInput } from "../../custom/TextInput";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, TouchableRipple, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";

export interface InputsLogin {
  email: string;
  password: string;
}

const configFormLogin: UseFormProps<InputsLogin> = {
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
  },
};

export const FormLogin: React.FC = (): React.JSX.Element => {
  const methods = useForm<InputsLogin>(configFormLogin);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { handleSubmit, reset } = methods;

  const onSubmit = async ({ email, password }: InputsLogin) => {
    console.log(email, password);
    reset();
    try {
      const sendData = { email, password };
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(sendData),
      });
      const data = await res.json();
      console.log(data);
      reset();
    } catch (error) {
      const e = error as Error;
      console.log(e);
    }
  };

  return (
    <FormProvider {...methods}>
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
    marginTop: "50%",
  },
  link: {
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 20,
  },
});
