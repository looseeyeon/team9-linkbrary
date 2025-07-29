import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modals/shareModal.module.css";

export default function DeleteModal({folderName}) {
  return (
    <Modal title="폴더 삭제">
      <div className={styles.folderName}>{folderName}</div>
      <Button variant="modal">삭제하기</Button>
    </Modal>
  );
}
