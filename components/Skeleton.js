import styles from "@/styles/Skeleton.module.css";
import Shimmer from "./Shimmer";

export default function Skeleton() {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <div className={styles.cardImage}>
          <Shimmer />
        </div>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoContainer}>
          <div className={styles.timePast}>
            <Shimmer />
          </div>
        </div>
        <div className={styles.urlTitle}>
          <Shimmer />
        </div>
        <div className={styles.date}>
          <Shimmer />
        </div>
      </div>
    </div>
  );
}
