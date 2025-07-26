import Button from "@/components/Button";
import styles from "@/styles/LandingPage.module.css";
import React from "react";
import Image from "next/image";

export default function LandingPage() {
  // const [isLoggedIn, setIsLoggdedIn] = useState(false);

  // const handleLinkaddClick = () => {
  //   if (isLoggedIn) {
  //     router.push("/LinkPage");
  //   } else {
  //     router.push("/LoginPage");
  //   }
  // };

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1>
              <span>세상의 모든 정보</span>를 <br />
              쉽게 저장하고 관리해 보세요
            </h1>
            <Button variant="landingLinkAdd">링크 추가하기</Button>
            <div className={styles.landingHeader}>
              <Image
                src="/assets/landingmain.png"
                alt={"랜딩페이지 상단이미지"}
                width={1118}
                height={659}
              />
            </div>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.saveContent}>
            <div className={styles.textContainer}>
              <h2>
                <span>원하는 링크</span> <br /> 저장하세요
              </h2>
              <p>
                나중에 읽고 싶은 글, 다시 보고 싶은 영상, <br />
                사고 싶은 옷, 기억하고 싶은 모든 것을 <br /> 한 공간에
                저장하세요.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.images}>
                <Image
                  src="/assets/savelinks.png"
                  alt={"랜딩페이지 상단이미지"}
                  fill
                  sizes="(max-width: 550px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <div className={styles.manageContent}>
            <div className={styles.textContainer}>
              <h2>
                링크를 폴더로 <br />
                <span>관리</span> 하세요
              </h2>
              <p>
                나만의 폴더를 무제한으로 만들고 <br />
                다양하게 활용할 수 있습니다.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.images}>
                <Image
                  src="/assets/managelinks.png"
                  alt={"랜딩페이지 상단이미지"}
                  fill
                  sizes="(max-width: 550px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <div className={styles.shareContent}>
            <div className={styles.textContainer}>
              <h2>
                저장한 링크를 <br />
                <span>공유</span>해 보세요
              </h2>
              <p>
                여러 링크를 폴더에 담고 공유할 수 있습니다. <br />
                가족, 친구, 동료들에게 쉽고 빠르게 링크를 <br />
                공유해 보세요.
              </p>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.images}>
                <Image
                  src="/assets/sharelinks.png"
                  alt={"랜딩페이지 상단이미지"}
                  fill
                  sizes="(max-width: 550px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <div className={styles.searchContent}>
            <div className={styles.textContainer}>
              <h2>
                저장한 링크를 <br />
                <span>검색</span>해 보세요
              </h2>
              <p>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.images}>
                <Image
                  src="/assets/searchlinks.png"
                  alt={"랜딩페이지 상단이미지"}
                  fill
                  sizes="(max-width: 550px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
