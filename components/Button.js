import styles from "../styles/Button.module.css";

export default function Button({
  children,
  onClick,
  type,
  variant,
  disabled = false,
}) {
  const buttonClassName = `${styles.button} ${styles[variant] || ""} ${
    disabled ? styles.disabled : ""
  }`;
  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
