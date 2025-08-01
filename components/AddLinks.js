import { useState } from "react";
import Image from "next/image";
import styles from "../styles/AddLinks.module.css";
import Button from "./Button";
import axios from "@/lib/axios";

export default function AddLinks({ onLinkAdded }) {
  const [link, setLink] = useState("");

  const handleAddLink = async () => {
    if (!link.trim()) {
      alert("링크를 입력해주세요.");
      return;
    }

    try {
      console.log("링크 추가 요청:", { url: link });

      const res = await axios.post("/links", {
        url: link,
        folderId: 1385,
      });

      console.log("서버 응답:", res.data);
      setLink(""); // 입력 필드 초기화

      // 부모 컴포넌트에 새 링크 추가 알림
      if (onLinkAdded) {
        onLinkAdded(res.data);
      }
    } catch (error) {
      console.error("링크 추가 실패:", error);
      console.error("에러 응답:", error.response?.data);

      // 더 구체적인 에러 메시지 표시
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "링크 추가에 실패했습니다.";
      alert(`링크 추가 실패: ${errorMessage}`);
    }
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
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button variant="addLinks" onClick={handleAddLink}>
          추가하기
        </Button>
      </div>
    </div>
  );
}
