import { forwardRef } from "react";
import styles from "@/styles/Modals/LinkEditModal.module.css";

const LinkEditModal = forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.linkEditModal}>
      <div className={styles.deleteWrapper}>
        <div className={styles.deleteButton}>삭제하기</div>
      </div>
      <div className={styles.editWrapper}>
        <div className={styles.editButton}>수정하기</div>
      </div>
    </div>
  );
});


export default LinkEditModal;
