// import Button from "../Button";
// import Modal from "./Modal";
// import styles from "@/styles/Modals/AddInFolderModal.module.css";
// import { useState } from "react";

// export default function AddInFolderModal({ folders = [], onAdd }) {
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [linkName, setLinkName] = useState("");

//   const handleFolderClick = (folder) => {
//     setSelectedFolder(folder);
//   };

//   const handleAddClick = () => {
//     if (selectedFolder) {
//       onAdd(selectedFolder.name);
//     }
//   };

//   return (
//     <Modal title="폴더에 추가">
//       <div className={styles.linkName}>{linkName}</div>
//       <div className={styles.folderList}>
//         {folders.map((folder, index) => (
//           <div
//             key={index}
//             className={`${styles.folderItem} ${
//               selectedFolder === folder ? styles.selected : ""
//             }`}
//             onClick={() => handleFolderClick(folder)}
//           >
//             <div className={styles.folderName}>{folder.name}</div>
//             <div className={styles.linkCount}>
//               {folder.links.length}개의 링크
//             </div>
//           </div>
//         ))}
//       </div>
//       <Button variant="modal" onClick={handleAddClick}>
//         추가하기
//       </Button>
//     </Modal>
//   );
// }
