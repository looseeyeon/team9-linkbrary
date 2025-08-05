import Image from "next/image";
import styles from "@/styles/linkCard.module.css";
import { useState, useRef } from "react";
import LinkEditModal from "@/components/Modals/LinkEditModal";
import useOnClickOutside from "@/hooks/useOnClickOutside.js";
import { editLink, deleteLink } from "@/lib/api_links.js";
import { useAuth } from "@/contexts/AuthProvider";

export default function LinkCard({
  imageSource,
  description,
  createdAt,
  title,
  url,
  id,
  onLinkUpdate,
}) {
  const { user, getToken } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsPopoverOpen(false));

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

  const handleKebabClick = (e) => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleEditClick = async (newUrl) => {
    try {
      if (!user) {
        console.error("No user found");
        return;
      }

      const token = getToken();
      if (!token) {
        console.error("No token found");
        return;
      }

      await editLink(token, id, newUrl);
      setIsPopoverOpen(false);

      // 부모 컴포넌트에 업데이트 알림
      if (onLinkUpdate) {
        onLinkUpdate(id, newUrl);
      }
    } catch (error) {
      console.error("Error editing link:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (!user) {
        console.error("No user found");
        return;
      }

      const token = getToken();
      if (!token) {
        console.error("No token found");
        return;
      }

      await deleteLink(token, id);

      // 부모 컴포넌트에 삭제 알림
      if (onLinkUpdate) {
        onLinkUpdate(id, null); // null을 전달하여 삭제됨을 알림
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper} onClick={handleCardClick}>
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
              const hours = Math.floor(timeDiff / (1000 * 60 * 60));
              const minutes = Math.floor(
                (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
              );

              if (hours > 0 && hours < 24) {
                return `${hours} hours ago`;
              } else if (hours >= 24) {
                const day = Math.floor(hours / 24);
                return `${day} days ago`;
              } else {
                return `${minutes} minutes ago`;
              }
            })()}
          </div>
          <div className={styles.kebabWrapper}>
            <button className={styles.kebabButton} onClick={handleKebabClick}>
              <Image
                className={styles.kebab}
                src="/assets/kebab.png"
                alt="kebab button"
                width={21}
                height={17}
              />
            </button>
            {isPopoverOpen && (
              <LinkEditModal
                ref={ref}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                currentUrl={url}
                onClose={() => setIsPopoverOpen(false)}
              />
            )}
          </div>
        </div>
        <div className={styles.urlTitle}>
          <p onClick={handleCardClick} className={styles.urlTitleText}>
            {description || url}
          </p>
        </div>
        <div className={styles.date}>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
