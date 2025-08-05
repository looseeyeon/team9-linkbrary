import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modals/shareModal.module.css";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  folderName = "",
  isLoading = false,
}) {
  return (
    <>
      {isOpen && (
        <Modal title="폴더 삭제" onClose={onClose}>
          <div className={styles.folderName}>
            <span>{folderName}</span>
          </div>
          <div className={styles.buttonGroup}>
            <Button variant="modal" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "삭제 중..." : "삭제하기"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
