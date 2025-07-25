import styles from "../styles/Label.module.css";

export default function Label({ children, className = "", ...rest }) {
  return (
    <label className={`${styles.label} ${className}`} {...rest}>
      {children}
    </label>
  );
}
