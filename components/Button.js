import styles from "../styles/Button.module.css";

export default function Button({ children, onclick, type, variant }) {
  const buttonClassName = `${styles.button} ${styles[variant] || ""}`;
  return (
    <button className={buttonClassName} onclick={onclick} type={type}>
      {children}
    </button>
  );
}
