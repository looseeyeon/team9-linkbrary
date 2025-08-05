import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import styles from "@/styles/Modals/EditModal.module.css";
import Modal from "./Modal";

export default function EditModal({
  isOpen,
  onClose,
  onConfirm,
  currentFolderName = "",
  isLoading = false,
}) {
  const [folderName, setFolderName] = useState(currentFolderName);

  // currentFolderName이 변경될 때마다 folderName state 업데이트
  useEffect(() => {
    setFolderName(currentFolderName);
  }, [currentFolderName]);

  const handleConfirm = () => {
    if (folderName.trim()) {
      onConfirm(folderName.trim());
    }
  };

  const handleClose = () => {
    setFolderName(currentFolderName);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <Modal title="폴더 이름 변경" onClose={handleClose}>
          <Input
            placeholder="폴더명 입력"
            className={styles.input}
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleConfirm()}
          />
          <Button
            variant="modal"
            onClick={handleConfirm}
            disabled={isLoading || !folderName.trim()}
          >
            {isLoading ? "변경 중..." : "변경하기"}
          </Button>
        </Modal>
      )}
    </>
  );
}
