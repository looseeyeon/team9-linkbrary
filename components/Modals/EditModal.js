import Button from "../Button";
import Input from "../Input";
import styles from "@/styles/EditModal.module.css";
import Image from "next/image";

export default function EditModal() {
  return (
    <div className={styles.modalWrapper}>
      <h2 className={styles.title}>폴더 이름 변경</h2>
      <Image
        src="/assets/close.png"
        width={24}
        height={24}
        alt="닫기 창 이미지"
        className={styles.closeImage}
      ></Image>
      <Input className={styles.editInput} />
      <Button variant="editModal">변경하기</Button>
    </div>
  );
}
