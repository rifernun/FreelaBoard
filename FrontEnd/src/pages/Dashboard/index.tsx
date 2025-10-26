import { useState } from "react";
import styles from "./styles.module.css";

export function DashBoardPage() {
  const [welcome, setWelcome] = useState(true);
  setTimeout(() => {
    setWelcome(false);
  }, 2000);

  return (
    <>
      <div className={styles.container}>
        <h1
          className={`${
            welcome ? styles.appearWelcome : styles.disappearWelcome
          }`}
        >
          Bem vindo {"{ user }"}
        </h1>
      </div>
    </>
  );
}
