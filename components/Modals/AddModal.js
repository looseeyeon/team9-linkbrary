import { useState, useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";
import styles from "@/styles/Modals/EditModal.module.css";

export default function AddModal({
  isOpen,
  onClose,
  folderName,
  setFolderName,
  onAdd,
  isLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <Modal title="폴더 추가" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="폴더명 입력"
          className={styles.input}
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <Button variant="modal" onClick={onAdd} disabled={isLoading}>
          {isLoading ? "추가 중..." : "추가하기"}
        </Button>
      </form>
    </Modal>
  );
}
