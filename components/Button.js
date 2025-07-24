import styles from "../styles/Button.module.css";

export default function Button({ children, onclick, type }) {
  const buttonClassName = `${styles.button} ${styles[type] || ""}`;
  return (
    <button className={buttonClassName} onclick={onclick} type={type}>
      {children}
    </button>
  );
}
