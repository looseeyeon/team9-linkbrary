import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import Label from "@/components/Label";
import Input from "@/components/Input";
import styles from "@/styles/signup.module.css";

export default function SignUp() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImage}>
            <Image
              src="/assets/Linkbrary.png"
              alt="로고이미지"
              width={210.58}
              height={38}
              className={styles.logoImage}
            />
          </div>
          <div className={styles.textContainer}>
            <p>
              이미 회원이신가요?
              <Link href="/Login">로그인하기</Link>
            </p>
          </div>
        </div>
        <form className={styles.form}>
          <Label className={styles.label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.input}
            name="email"
            type="email"
            placeholder="codeit@codeit.com"
          />
          <Label className={styles.label}>이름</Label>
          <Input
            id="name"
            className={styles.input}
            name="name"
            type="text"
            placeholder="이름"
          />
          <Label className={styles.label} htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            className={styles.input}
            name="password"
            type="password"
          />
          <Label className={styles.label} htmlFor="password">
            비밀번호 확인
          </Label>
          <Input
            id="password-checj"
            className={styles.input}
            name="password"
            type="password"
          />
          <Button variant="signUp" type="submit">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
