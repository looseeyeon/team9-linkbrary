// Folder.jsx
import styles from "@/styles/Folder.module.css";

// 단일 폴더 컴포넌트
function Folder({ folder, isSelected, onClick }) {
  return (
    <div 
      className={`${styles.folderWrapper} ${isSelected ? styles.selected : ''}`}
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
      className={`${styles.folderWrapper} ${isSelected ? styles.selected : ''}`}
      onClick={() => onClick(null)}
    >
      <div className={styles.folderName}>전체</div>
    </div>
  );
}

// 폴더 리스트 컴포넌트
export default function FolderList({ folders = [], selectedFolderId, handleFolderClick }) {
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
      <button className={styles.addFolderButton}>폴더 추가 +</button>
    </div>
  );
}
