
import styles from "@/styles/Modals/shareModal.module.css";
import Image from "next/image";
import Modal from "./Modal";

export default function ShareModal({folderName}) {
  return (
    <Modal title="폴더 공유">
      <div className={styles.folderName}>{folderName}</div>
      <div className={styles.shareContainer}>
        <div className={styles.shareContents}>
          <Image
            src="/assets/kakaotalk.png"
            width={42}
            height={42}
            alt="카카오 공유"
            className={styles.KakaoImage}
          />
          <p className={styles.shareText}>카카오톡</p>
        </div>
        <div className={styles.shareContents}>
          <Image
            src="/assets/facebook-modal.png"
            width={42}
            height={42}
            alt="페이스북 공유"
            className={styles.facebookImage}
          />
          <p className={styles.shareText}>페이스북 </p>
        </div>
        <div className={styles.shareContents}>
          <Image
            src="/assets/copylink.png"
            width={42}
            height={42}
            alt="링크 공유"
            className={styles.linkImage}
          />
          <p className={styles.shareText}>카카오톡</p>
        </div>
      </div>
    </Modal>
  );
}
