import { Dialog, Portal } from "react-native-paper";
import { FormFilters } from "../Forms/Filters";
import { Filters } from "../../screens/Scheduler";

export interface DialogFiltersProps {
  visible: boolean;
  setVisible: (flag: boolean) => void;
  setFilters: (filters: Filters) => void;
}

export const DialogFilters: React.FC<DialogFiltersProps> = ({
  visible,
  setVisible,
  setFilters,
}): React.JSX.Element => {

  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => hideDialog()}>
        <Dialog.Title>Фильтры</Dialog.Title>
        <Dialog.Content>
          <FormFilters hideDialog={hideDialog} setFilters={setFilters} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
