import { useState } from "react";
import Image from "next/image";
import styles from "../styles/AddLinks.module.css";
import Button from "./Button";

export default function AddLinks() {
  const [link, setLink] = useState("");

  const handleAddLink = async () => {
    const response = await axios.post("/links", { url: link });
    console.log(`추가된 링크: ${response.data}`);
    setLink("");
  };

  return (
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
        />
        <Button type="AddLinks" onClick={handleAddLink}>
          추가하기
        </Button>
      </div>
    </div>
  );
}
