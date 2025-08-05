// Folder.jsx
import { useState } from "react";
import styles from "@/styles/Folder.module.css";
import AddModal from "./Modals/AddModal";
import { createFolder } from "@/lib/api_folders";

// 단일 폴더 컴포넌트
function Folder({ folder, isSelected, onClick }) {
  return (
    <div
      className={`${styles.folderWrapper} ${isSelected ? styles.selected : ""}`}
      onClick={() => onClick(folder.id)}
    >
      <div className={styles.folderName}>{folder.name}</div>
    </div>
  );
}

// 전체 폴더 컴포넌트
function AllFolder({ isSelected, onClick }) {
  return (
    <div
      className={`${styles.folderWrapper} ${isSelected ? styles.selected : ""}`}
      onClick={() => onClick(null)}
    >
      <div className={styles.folderName}>전체</div>
    </div>
  );
}

// 폴더 리스트 컴포넌트
export default function FolderList({
  folders = [],
  selectedFolderId,
  handleFolderClick,
  onFolderAdded,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFolder = async () => {
    if (!folderName.trim()) {
      alert("폴더명을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      await createFolder(token, folderName);

      // 폴더 추가 성공 후 처리
      setFolderName("");
      setIsAddModalOpen(false);

      // 부모 컴포넌트에 폴더 추가 알림
      if (onFolderAdded) {
        onFolderAdded();
      }
    } catch (error) {
      console.error("폴더 생성 실패:", error);
      alert("폴더 생성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setFolderName("");
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setFolderName("");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.folderList}>
        <AllFolder
          isSelected={selectedFolderId === null}
          onClick={handleFolderClick}
        />
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            isSelected={selectedFolderId === folder.id}
            onClick={handleFolderClick}
          />
        ))}
      </div>
      <button className={styles.addFolderButton} onClick={openAddModal}>
        폴더 추가 +
      </button>

      {isAddModalOpen && (
        <AddModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          folderName={folderName}
          setFolderName={setFolderName}
          onAdd={handleAddFolder}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
