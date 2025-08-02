import Button from "../Button";
import Modal from "./Modal";
import styles from "@/styles/Modals/AddInFolderModal.module.css";
import Image from "next/image";

export default function AddInFolderModal({
  folders = [],
  selectedFolder,
  onFolderClick,
  onAdd,
  onClose,
}) {
  const handleAddClick = () => {
    if (selectedFolder) {
      onAdd();
    }
  };

  const handleFolderClick = (folder) => {
    onFolderClick(folder);
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
            onClick={(e) => {
              e.stopPropagation();
              handleFolderClick(folder);
            }}
          >
            {selectedFolder?.id === folder.id ? (
              <Image
                src="/assets/check.png"
                alt="checkFolder"
                width={14}
                height={14}
                className={styles.checkIcon}
              />
            ) : (
              ""
            )}
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
