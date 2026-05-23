import { Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { AppDispatch } from "../store/store";

export interface WithErrorAndLoadingProps {
  error: string;
  dispatch: AppDispatch;
}

export const withErrorAndLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithErrorAndLoadingProps>
) => {
  return (props: P) => {
    const {isLoading, error} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    if(isLoading) {
      return <Text>Loading</Text>
    }

    return <WrappedComponent {...props} error={error} dispatch={dispatch} />;
  };
};
