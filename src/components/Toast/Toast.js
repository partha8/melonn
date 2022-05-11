import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../../context";

import "./toast.css";

export const Toast = () => {
  const { toast, toastHandler } = useAppContext();

  const { message, type } = toast;

  useEffect(() => {
    const timeout = setTimeout(() => {
      toastHandler();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`alert alert-${type} toast`}>
      <p>{message}</p>
    </div>
  );
};
