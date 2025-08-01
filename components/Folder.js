// Folder.jsx
import styles from "@/styles/Folder.module.css";

// 단일 폴더 컴포넌트
function Folder({ folder }) {
  return (
    <div className={styles.folderWrapper}>
      <div className={styles.folderName}>{folder.name}</div>
    </div>
  );
}

// 폴더 리스트 컴포넌트
export default function FolderList({ folders = [] }) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.folderList}>
        {folders.map((folder) => (
          <Folder key={folder.id} folder={folder} />
        ))}
      </div>
      <button className={styles.addFolderButton}>폴더 추가 +</button>
    </div>
  );
}