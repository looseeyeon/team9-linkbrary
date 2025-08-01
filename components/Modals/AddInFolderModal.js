import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modals/AddInFolderModal.module.css";
import { useState } from "react";

export default function AddInFolderModal({ folders = [], onAdd, onClose }) {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleAddClick = () => {
    if (selectedFolder) {
      onAdd(selectedFolder.id); // folder.id를 전달
    }
  };

  return (
    <Modal title="폴더에 추가" onClose={onClose}>
      <div className={styles.folderList}>
        {folders.map((folder, index) => (
          <div
            key={folder.id}
            className={`${styles.folderItem} ${
              selectedFolder?.id === folder.id ? styles.selected : ""
            }`}
            onClick={() => handleFolderClick(folder)}
          >
            <div className={styles.folderName}>{folder.name}</div>
            <div className={styles.linkCount}>{folder.linkCount}개의 링크</div>
          </div>
        ))}
      </div>
      <Button variant="modal" onClick={handleAddClick}>
        추가하기
      </Button>
    </Modal>
  );
}
