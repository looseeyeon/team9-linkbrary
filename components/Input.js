import styles from "../styles/Input.module.css";

export default function Input({ children, className = "", ...rest }) {
  return (
    <input className={`${styles.input} ${className}`} {...rest}>
      {children}
    </input>
  );
}
