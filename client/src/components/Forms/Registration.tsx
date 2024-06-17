import { View } from "react-native";
import { FormProvider, UseFormProps, useForm } from "react-hook-form";
import { Button, Text, useTheme, ActivityIndicator } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { CustomInput } from "../../components/custom/TextInput";
import { fetchRegistration } from "../../store/reducers/auth/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useState } from "react";
import { Inputs } from "./models";
import { createStyles } from "./Login";

const configFormRegistration: UseFormProps<Inputs> = {
  mode: "onBlur",
  defaultValues: {
    email: "",
    password: "",
    passwordRepeat: "",
  },
};

export const FormRegistration: React.FC = (): React.JSX.Element => {
  const { token } = useAppSelector(state => state.notificationReducer);
  const methods = useForm<Inputs>(configFormRegistration);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { handleSubmit } = methods;

  const onSubmit = async (fields: Inputs) => {
    if (fields.email && fields.password && fields.passwordRepeat) {
      try {
        setLoading(true);
        await dispatch(fetchRegistration(fields, token));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
      
    }
    setError("Заполните все поля!");
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  return (
    <FormProvider {...methods}>
      <View>
        {error && (
          <Text variant="bodyMedium" style={styles.error}>
            {error}
          </Text>
        )}
        <CustomInput name="email" label="Email" />
        <CustomInput name="password" label="Password" />
        <CustomInput name="passwordRepeat" label="Confirm password" />
        <Button
          style={styles.button}
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
        >
          Зарегистрироваться
        </Button>
        <Link style={styles.link} to={{ screen: "Login" }}>
          Уже сеть аккаунт? Войдите в приложение
        </Link>
      </View>
    </FormProvider>
  );
};
