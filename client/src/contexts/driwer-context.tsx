import React, {
    useState,
    useContext,
    createContext,
  } from "react";
  
  interface DriwerProviderProps {
    children: React.ReactNode;
  }
  
  interface DriwerContextType {
      active: string;
      handlerSetActive: (nameScreens: string) => void;
  }
  
  const driwerContextInit: DriwerContextType = {
    active: "",
    handlerSetActive: () => {}
  }
  
  const DriwerContext = createContext<DriwerContextType>(driwerContextInit);
  
  export const DriwerProvider: React.FC<DriwerProviderProps> = ({ children }) => {
    const [active, setActive] = useState<string>("Планировщик");

    const handlerSetActive = (nameScreens: string) => {
        setActive(prev => prev !== nameScreens ? nameScreens : prev);
    }
  
    return (
      <DriwerContext.Provider
        value={{ active, handlerSetActive }}
      >
        {children}
      </DriwerContext.Provider>
    );
  };
  
  export const useDriwer = () => useContext(DriwerContext);