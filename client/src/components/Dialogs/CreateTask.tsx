import { Text, Button, Portal, Dialog } from "react-native-paper";
import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Verification } from "../custom/verification";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../NavigationContaners/RootContainer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchActivate, fetchSendLetter } from "../../store/reducers/auth/ActionCreators";
import { FormCreateTask } from "../Forms/CreateTask";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DialogCreateTask: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
}): React.JSX.Element => {
  const {id} = useAppSelector(state => state.authReducer.user)
  const dispatch = useAppDispatch();

  const hideDialog = async () => {
    // dispatch(fetchActivate(code));
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Подтвердите почту</Dialog.Title>
          <Dialog.Content>
            <ScrollView>
            <FormCreateTask hideDialog={hideDialog} />
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});