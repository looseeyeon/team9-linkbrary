import Button from "@/components/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Label from "@/components/Label";
import Input from "@/components/Input";
import styles from "@/styles/signup.module.css";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const isFormValid = password && email;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);

      const errorMessage = error.response?.data?.message || error.message;
      alert(`${errorMessage}`);
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
              ></Image>
            </Link>
          </div>
          <div className={styles.textContainer}>
            <p>
              회원이 아니신가요?
              <Link href="/signup">회원가입 하기</Link>
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
            value={email}
            // placeholder="codeit@codeit.com"
            onChange={(e) => setEmail(e.target.value)}
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
            ></Image>
          </div>

          <Button variant="login" type="submit" disabled={!isFormValid}>
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
