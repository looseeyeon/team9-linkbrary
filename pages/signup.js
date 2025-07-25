import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import Label from "@/components/Label";
import Input from "@/components/Input";
import styles from "@/styles/signup.module.css";
import { useState } from "react";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isMisMatch = confirm && password !== confirm;

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authContainer}>
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
          <div className={styles.passwordWrapper}>
            <Input
              id="password"
              className={styles.input}
              name="password"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Image
              src={
                passwordVisible ? "/assets/eye-on.png" : "/assets/eye-off.png"
              }
              alt="비밀번호 숨김 이미지"
              width={16}
              height={16}
              className={styles.eyeOff}
              onClick={() => setPasswordVisible((prev) => !prev)}
            />
          </div>
          <Label className={styles.label} htmlFor="password">
            비밀번호 확인
          </Label>
          <div className={styles.passwordWrapper}>
            <Input
              id="password-confirm"
              className={isMisMatch ? `${styles.passwordError}` : styles.input}
              name="password"
              type={confirmVisible ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <Image
              src={
                confirmVisible ? "/assets/eye-on.png" : "/assets/eye-off.png"
              }
              alt="비밀번호 숨김 이미지"
              width={16}
              height={16}
              className={styles.eyeOff}
              onClick={() => setConfirmVisible((prev) => !prev)}
            />
          </div>
          {isMisMatch && (
            <p className={styles.errorText}>비밀번호가 다릅니다.</p>
          )}
          <Button variant="signUp" type="submit">
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
