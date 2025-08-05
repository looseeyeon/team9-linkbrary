import Modal from "./Modal";
import Button from "../Button";
import styles from "@/styles/Modals/DeleteLinkModal.module.css";

export default function DeleteLinkModal({
  isOpen,
  onClose,
  onDelete,
  linkUrl,
}) {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <Modal title="링크 삭제" onClose={onClose}>
        <div className={styles.linkUrl}>{linkUrl}</div>
        <Button variant="modal" onClick={handleDelete}>
          삭제하기
        </Button>
      </Modal>
    </>
  );
}
