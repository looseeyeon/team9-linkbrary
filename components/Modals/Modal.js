import styles from "@/styles/Modals/Modal.module.css";
import Image from "next/image";

export default function Modal({ title, children, onClose }) {
  return (
    <div className={styles.backgroundOverlay}>
      <div className={styles.modalWrapper}>
        <div onClick={onClose} className={styles.closeButton}>
          <Image
            src="/assets/close.png"
            width={24}
            height={24}
            alt="닫기 창 이미지"
          />
        </div>
        <div className={styles.modalTitle}>{title}</div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}
