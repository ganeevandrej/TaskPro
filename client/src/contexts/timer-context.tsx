import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useCallback,
} from "react";
import { sendNotification } from "../store/reducers/notifications/ActionCreators";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

interface TimerProviderProps {
  children: React.ReactNode;
}

interface TimerContextType {
  seconds: number;
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const timerContextInit: TimerContextType = {
  seconds: 0,
  isRunning: false,
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
};

const TimerContext = createContext<TimerContextType>(timerContextInit);

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [seconds, setSeconds] = useState<number>(5);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authReducer.user);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            resetTimer();
            dispatch(
              sendNotification({
                title: "Таймер",
                body: "Ваш помидор истек!",
                sound: "new_message_tone.wav",
                data: {
                  userId: user.id
                }
              })
            );
            clearInterval(intervalRef.current as NodeJS.Timeout);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(5);
  };

  return (
    <TimerContext.Provider
      value={{ seconds, isRunning, startTimer, stopTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
