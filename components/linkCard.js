import Image from "next/image";
import styles from "@/styles/linkCard.module.css";

export default function LinkCard({
  imageSource,
  description,
  createdAt,
  title,
  url,
}) {
  const handleCardClick = () => {
    window.open(url, "_blank");
  };

  const date = new Date(createdAt);
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return (
    <div className={styles.cardWrapper} onClick={handleCardClick}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.cardImage}
          src={imageSource || "/assets/defaultCardImage.png"}
          alt={title || "defaultImage"}
          width={340}
          height={250}
        />

        <Image
          className={styles.favorite}
          src="/assets/favorite.png"
          alt="favorite button"
          width={34}
          height={34}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.infoContainer}>
          <div className={styles.timePast}>
            {/* TODO: 시간 계산 로직 추가, 10분전에 추가한 것 까지만 표시 */}
            {Math.floor((new Date() - new Date(createdAt)) / 60000)} minutes ago
          </div>
          <Image
            className={styles.kebab}
            src="/assets/kebab.png"
            alt="kebab button"
            width={21}
            height={17}
          />
        </div>
        <div className={styles.urlTitle}>
          <p>{description || url}</p>
        </div>
        <div className={styles.date}>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
