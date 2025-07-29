import Image from "next/image";

export default function Card() {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <Image />
      </div>
      <div className={styles.textWrapper}>
        <div>
          <div>10min</div>
          <Image/>
        </div>
        <p></p>
        <p></p>
      </div>
    </div>
  );
}
