import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import Label from "@/components/Label";
import Input from "@/components/Input";
import styles from "@/styles/signup.module.css";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isMisMatch = confirm && password !== confirm;

  const isFormValid =
    password && confirm && email && name && password === confirm;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/auth/sign-up", { name, email, password });
    } catch (error) {
      console.error("회원가입 실패:", error.response?.data || error.message);
    }
  }

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImage}>
            <Link href="/">
              <Image
                src="/assets/Linkbrary.png"
                alt="로고이미지"
                width={210.58}
                height={38}
                className={styles.logoImage}
              />
            </Link>
          </div>
          <div className={styles.textContainer}>
            <p>
              이미 회원이신가요?
              <Link href="/login">로그인하기</Link>
            </p>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Label className={styles.label} htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            className={styles.input}
            name="email"
            type="email"
            // placeholder="codeit@codeit.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label className={styles.label}>이름</Label>
          <Input
            id="name"
            className={styles.input}
            name="name"
            type="text"
            // placeholder="이름"
            onChange={(e) => setName(e.target.value)}
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
              name="password-confirm"
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
          <Button variant="signUp" type="submit" disabled={!isFormValid}>
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
}
