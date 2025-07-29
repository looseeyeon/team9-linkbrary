import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";
import styles from "@/styles/Modals/EditModal.module.css";

export default function AddModal(){
  return(
    <Modal title="폴더 추가" className>
      <Input  placeholder="폴더명 입력" className={styles.input}/>
      <Button variant="modal">추가하기</Button>
    </Modal>
  )
}