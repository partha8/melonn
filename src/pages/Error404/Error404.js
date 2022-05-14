import React from "react";
import styles from "./error404.module.css";

export const Error404 = () => {
  return (
    <div className={styles.errorContainer}>
      <img className={styles.img} src="/assets/error404.png" alt="error 404!" />
      <h1>PAGE NOT FOUND</h1>
    </div>
  );
};
