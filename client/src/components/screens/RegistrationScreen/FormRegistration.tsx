import { View, StyleSheet, Dimensions } from "react-native";
import { CustomInput } from "../../custom/TextInput";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, TouchableRipple, Text } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";
import { useState } from "react";
import { DialogRegistration } from "../../custom/DialogRegistration";

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
  const [res, setRes] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const methods = useForm<Inputs>(configFormRegistration);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { handleSubmit, reset } = methods;

  const onSubmit = async ({ email, password }: Inputs) => {
    try {
      const sendData = { email, password };
      const res = await fetch("http://192.168.1.67:5000/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(sendData),
      });
      
      const data = await res.json();
      console.log(data);
      setVisible(true);
      reset();
    } catch (error) {
      const e = error as Error;
      console.log(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text>{res}</Text>
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
        <DialogRegistration visible={visible} setVisible={setVisible} />
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
