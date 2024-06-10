import { View, StyleSheet } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import {
  Button,
  TouchableRipple,
  Text,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CustomInput } from "../../components/custom/TextInput";
import { useAppDispatch } from "../../hooks/redux";
import { fetchLogin } from "../../store/reducers/auth/ActionCreators";
import { InputsLogin } from "./models";
import { RootStackParamList } from "../../Navigation/models";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { useState } from "react";

const configFormLogin: UseFormProps<InputsLogin> = {
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
  },
};

export const FormLogin: React.FC = (): React.JSX.Element => {
  const methods = useForm<InputsLogin>(configFormLogin);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  

  const { handleSubmit } = methods;

  const onSubmit = async (fields: InputsLogin) => {
    if (fields.email && fields.password) {
      setLoading(true);
      await dispatch(fetchLogin(fields));
      setLoading(false);
    }
    setError("Заполните все поля!");
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  return (
    <FormProvider {...methods}>
      {error && (
        <Text variant="bodyMedium" style={styles.error}>
          {error}
        </Text>
      )}
      <View>
        <CustomInput name="email" label="Email" />
        <CustomInput name="password" label="Password" />
        <Button
          style={styles.button}
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
        >
          Войти
        </Button>
        <TouchableRipple onPress={() => navigation.navigate("Registration")}>
          <Text variant="bodySmall" style={styles.link}>
            Новый пользователь? Зарегистрируйтесь здесь
          </Text>
        </TouchableRipple>
      </View>
    </FormProvider>
  );
};

export const createStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    error: {
      color: colors.error,
      paddingVertical: 15,
      textAlign: "center",
      borderWidth: 1,
      borderColor: colors.error,
      marginTop: 10,
      borderRadius: 10,
    },
    link: {
      textDecorationLine: "underline",
      textAlign: "center",
      marginVertical: 15,
      color: colors.primary,
    },
    button: {
      marginTop: 30,
      borderColor: colors.primary,
    },
  });
