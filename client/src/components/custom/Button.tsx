import { Button } from "react-native-paper";

export interface CustomButtonProps {
  callback: () => void;
  title: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  callback,
  title,
}): React.JSX.Element => {
  return (
    <Button mode="text" onPress={() => callback()}>
      {title}
    </Button>
  );
};
