import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";

interface TimerProviderProps {
  children: React.ReactNode;
}

interface TimerContextType {
    seconds: number, 
    isRunning: boolean, 
    startTimer: () => void, 
    stopTimer: () => void, 
    resetTimer: () => void
}

const timerContextInit = {
    seconds: 0, 
    isRunning: false, 
    startTimer: () => {}, 
    stopTimer: () => {}, 
    resetTimer: () => {}
}

const TimerContext = createContext<TimerContextType>(timerContextInit);

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [seconds, setSeconds] = useState<number>(30);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
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
    }
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(30);
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
