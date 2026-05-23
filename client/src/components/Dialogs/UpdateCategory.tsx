import { Portal, Dialog } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { FormCreateCategory } from "../Forms/CreateCategory";
import { FormUpdateCategory } from "../Forms/UpdateCategory";
import { ICategory } from "../../store/reducers/taskManager/TaskManagerSlice";

export interface IVerificationProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  category: ICategory;
}

export const DialogUpdateCategory: React.FC<IVerificationProps> = ({
  visible,
  setVisible,
  category
}): React.JSX.Element => {
  const hideDialog = async () => {
    setVisible(false);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{ paddingVertical: 0 }}>
            Создайте Категорию
          </Dialog.Title>
          <Dialog.Content>
            <FormUpdateCategory hideDialog={hideDialog} category={category} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});
