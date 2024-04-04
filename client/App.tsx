import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


export interface User {
  username: string,
  id: number,
  email: string,
  phone: string
}

interface Inputs {
  email: string,
  password: string,
  repeatPassword: string
}

const App: React.FC = (): React.JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: ""
    }
  });

  const onSubmit = async ({email, password}: Inputs) => {
    const res = await fetch("http://localhost:3000/auth/registration", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email, password})
    });
    console.log(res);
    reset();
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetch("http://localhost:3000/api/user");
      const message = await data.json();
      setUsers(message);
    }

    getData();
  }, [])

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="repeatPassword"
      />
      <Pressable  onPress={handleSubmit(onSubmit)}>
          <Text>Send</Text>
      </Pressable>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
});