import Image from "next/image";
import styles from "@/styles/linkCard.module.css";
import { useState, useEffect } from "react";

export default function LinkCard({
  imageSource,
  description,
  createdAt,
  title,
  url,
}) {
  const [imageError, setImageError] = useState(false);


  const handleCardClick = () => {
    let fullUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      fullUrl = `https://${url}`;
    }
    window.open(fullUrl, "_blank");
  };

  const handleImageError = () => {
    setImageError(true);
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
          src={
            imageError || !imageSource
              ? "/assets/defaultCardImage.png"
              : imageSource
          }
          alt={title || "defaultImage"}
          width={340}
          height={200}
          onError={handleImageError}
          unoptimized={true}
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
            {(() => {
              const timeDiff = new Date() - new Date(createdAt);
              const minutesDiff = Math.floor(timeDiff / 60000);

              // 1시간(60분) 이내에 생성된 링크만 시간 표시
              if (minutesDiff <= 60) {
                return `${minutesDiff} minutes ago`;
              }
              return ""; // 1시간이 지난 링크는 빈칸
            })()}
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
