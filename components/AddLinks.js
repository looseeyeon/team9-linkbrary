import Image from "next/image";
import styles from "../styles/AddLinks.module.css";
import Button from "./Button";
import { useState } from "react";
import AddInFolderModal from "./Modals/AddInFolderModal";

export default function AddLinks({
  setInputLink,
  inputLink,
  handleAddLinks,
  folders = [],
}) {
  const [showModal, setShowModal] = useState(false);

  const handleAddButtonClick = () => {
    if (inputLink.trim()) {
      setShowModal(true);
    }
  };

  const handleAddToFolder = (folderId) => {
    console.log(`링크를 폴더 ID ${folderId}에 추가합니다.`);
    // folderId와 함께 링크 추가 로직 호출
    handleAddLinks(folderId);
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.linkContainer}>
        <div className={styles.linkBox}>
          <div className={styles.imageContainer}>
            <Image
              src="/assets/link.png"
              alt="링크 찾기"
              className={styles.image}
              width={20}
              height={20}
            />
          </div>
          <input
            type="text"
            placeholder="링크를 추가해 보세요"
            className={styles.input}
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
          />
          <Button variant="addLinks" onClick={handleAddButtonClick}>
            추가하기
          </Button>
        </div>
      </div>

      {showModal && (
        <AddInFolderModal
          folders={folders}
          onAdd={handleAddToFolder}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}