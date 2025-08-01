import styles from "../styles/Header.module.css";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // 로그아웃 후 홈페이지로 이동
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.logo} href="/">
          <Image
            src="/assets/Linkbrary.png"
            alt="로고이미지"
            className={styles.logoImage}
            width={133}
            height={24}
          ></Image>
        </Link>
        <div className={styles.headerRight}>
          {user && (
            <button className={styles.favoriteButton}>⭐️ 즐겨찾기</button>
          )}

          {user && (
            <div className={styles.userInfo}>
              <Image className={styles.avatar} src={user.imageSource} width={28} height={28}/>
              <div>
                <span>{user.name}</span>
              </div>
            </div>
          )}

          {user ? (
            // 로그인된 경우: 로그아웃 버튼
            <Button variant="landingLogin" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            // 로그인되지 않은 경우: 로그인 버튼
            <Link href="/login">
              <Button variant="landingLogin">로그인</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
