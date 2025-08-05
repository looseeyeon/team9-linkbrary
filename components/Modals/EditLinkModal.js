import { useState } from "react";
import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";
import styles from "@/styles/Modals/EditLinkModal.module.css";

export default function EditLinkModal({ isOpen, onClose, onEdit, currentUrl }) {
  const [newUrl, setNewUrl] = useState(currentUrl || "");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (newUrl.trim()) {
      onEdit(newUrl);
      onClose();
    }
  };

  return (
    <>
      <Modal title="링크 수정" onClose={onClose}>
        <Input
          placeholder="링크 입력"
          className={styles.input}
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Button variant="modal" onClick={handleSubmit}>
          수정하기
        </Button>
      </Modal>
    </>
  );
}
