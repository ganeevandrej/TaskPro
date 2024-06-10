import { View } from "react-native";
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
import { fetchRegistration } from "../../store/reducers/auth/ActionCreators";
import { useAppDispatch } from "../../hooks/redux";
import { useState } from "react";
import { Inputs } from "./models";
import { RootStackParamList } from "../../Navigation/models";
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
  const methods = useForm<Inputs>(configFormRegistration);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { handleSubmit } = methods;

  const onSubmit = async (fields: Inputs) => {
    dispatch(fetchRegistration(fields));
    if (fields.email && fields.password && fields.passwordRepeat) {
      setLoading(true);
      await dispatch(fetchRegistration(fields));
      setLoading(false);
    }
    setError("Заполните все поля!");
  };

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  return (
    <FormProvider {...methods}>
      <View>
      {error && <Text variant="bodyMedium" style={styles.error}>{error}</Text>}
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
        <TouchableRipple onPress={() => navigation.navigate("Login")}>
          <Text variant="bodySmall" style={styles.link}>
            Уже сеть аккаунт? Войдите в приложение
          </Text>
        </TouchableRipple>
      </View>
    </FormProvider>
  );
};
