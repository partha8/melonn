import React, { createContext, useContext, useReducer } from "react";
import { appReducer } from "../reducers";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, {
    loading: false,
    toast: {
      showToast: false,
      message: "",
      type: "",
    },
  });
  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
