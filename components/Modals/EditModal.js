import Button from "../Button";
import Input from "../Input";
import styles from "@/styles/Modals/EditModal.module.css";

import Modal from "./Modal";

export default function EditModal() {

  return (
    <>
      <Modal title="폴더 이름 변경">
        <Input placeholder="폴더명 입력" className={styles.input} />
        <Button variant="modal">변경하기</Button>
      </Modal>
    </>
  );
}
