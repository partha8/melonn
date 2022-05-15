import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    showToast: false,
    message: "",
    type: "",
  });

  const toastHandler = (showToast = false, message = "", type = "") => {
    setToast({ showToast, message, type });
  };

  return (
    <AppContext.Provider value={{ loading, setLoading, toast, toastHandler }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
