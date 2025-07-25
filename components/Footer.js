import styles from "@/styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <p className={styles.footerColor}>©codeit-2025</p>
      <div className={styles.footerContent}>
        <Link href="/privacy" className={styles.footerLink}>
          Privacy Policy
        </Link>
        <Link href="/faq" className={styles.footerLink}>
          FAQ
        </Link>
      </div>
      <div className={styles.imageWrapper}>
        <Link href="https://www.facebook.com/">
          <Image
            src="/assets/Facebook.png"
            width={20}
            height={20}
            alt="facebookLogo"
          ></Image>
        </Link>
        <Link href="https://www.instagram.com/">
          <Image
            src="/assets/Instagram.png"
            width={20}
            height={20}
            alt="InstagramLogo"
          ></Image>
        </Link>
        <Link href="https://x.com/">
          <Image
            src="/assets/Twitter.png"
            width={20}
            height={20}
            alt="TwitterLogo"
          ></Image>
        </Link>
        <Link href="https://www.youtube.com/">
          <Image
            src="/assets/Youtube.png"
            width={20}
            height={20}
            alt="YoutubeLogo"
          ></Image>
        </Link>
      </div>
    </div>
  );
}
