import Button from "../Button";
import Input from "../Input";
import styles from "@/styles/EditModal.module.css";
import Image from "next/image";

export default function ShareModal() {
  return (
    <div className={styles.shareWrapper}>
      <h2 className={styles.title}>폴더 공유</h2>
      <p className={styles.subTitle}>폴더명</p>
      <div className={styles.shareContainer}>
        <div className={styles.shareContents}>
          <Image
            src="/assets/kakaotalk.png"
            width={42}
            height={42}
            alt="카카오 공유"
            className={styles.KakaoImage}
          ></Image>
          <p className={styles.shareText}>카카오톡</p>
        </div>
        <div className={styles.shareContents}>
          <Image
            src="/assets/facebook-modal.png"
            width={42}
            height={42}
            alt="페이스북 공유"
            className={styles.facebookImage}
          ></Image>
          <p className={styles.shareText}>페이스북 </p>
        </div>
        <div className={styles.shareContents}>
          <Image
            src="/assets/copylink.png"
            width={42}
            height={42}
            alt="링크 공유"
            className={styles.linkImage}
          ></Image>
          <p className={styles.shareText}>카카오톡</p>
          <Image
        src="/assets/close.png"
        width={24}
        height={24}
        alt="닫기 창 이미지"
        className={styles.closeImage}
      ></Image>
        </div>
      </div>
    </div>
  );
}
