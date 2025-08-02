import Image from "next/image";
import styles from "../styles/AddLinks.module.css";
import Button from "./Button";

export default function AddLinks({
  setInputLink,
  inputLink,
  onAddButtonClick,
}) {
  return (
    <div className={styles.linkContainer}>
      <div className={styles.linkBox}>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/link.png"
            alt="링크 추가"
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
        <Button variant="addLinks" onClick={onAddButtonClick}>
          추가하기
        </Button>
      </div>
    </div>
  );
}
