import { forwardRef } from "react";
import styles from "@/styles/Modals/LinkEditModal.module.css";

const LinkEditModal = forwardRef(({ onEdit, onDelete }, ref) => {
  return (
    <div ref={ref} className={styles.linkEditModal}>
      <div className={styles.deleteWrapper}>
        <div className={styles.deleteButton} onClick={onDelete}>
          삭제하기
        </div>
      </div>
      <div className={styles.editWrapper}>
        <div className={styles.editButton} onClick={onEdit}>
          수정하기
        </div>
      </div>
    </div>
  );
});

export default LinkEditModal;
