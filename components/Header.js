import styles from "../styles/Header.module.css";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

export default function Header() {
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
        <Link href="/login">
          <Button variant="landingLogin">로그인</Button>
        </Link>
      </div>
    </header>
  );
}
