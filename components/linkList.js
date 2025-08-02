import LinkCard from "./LinkCard";
import Skeleton from "./Skeleton";
import styles from "@/styles/linkList.module.css";

export default function LinkList({
  items,
  isLoading = false,
  skeletonCount = 9,
}) {
  const { list } = items;

  return (
    <div className={styles.cardList}>
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => (
            <Skeleton key={`skeleton-${index}`} />
          ))
        : list.map((link) => (
            <LinkCard
              key={link.id}
              imageSource={link.imageSource}
              description={link.description}
              createdAt={link.createdAt}
              title={link.title}
              url={link.url}
            />
          ))}
    </div>
  );
}
