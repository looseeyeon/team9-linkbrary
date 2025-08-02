import { createContext, useState, useContext, useEffect } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getMe() {
    try {
      const res = await axios.get("/users");
      const nextUser = res.data;
      setUser(nextUser);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      setUser(null);
    }
  }

  async function login({ email, password }) {
    try {
      const res = await axios.post("/auth/sign-in", { email, password });
      const accessToken = res.data.accessToken;

      if (accessToken && typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }

      await getMe();
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    setUser(null);
  }

  useEffect(() => {
    // 앱 시작 시 토큰이 있으면 사용자 정보 가져오기
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        getMe().finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(required) {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  useEffect(() => {
    if (required && !context.user) {
      router.push("/login");
    }
  }, [context.user, required, router]);

  return context;
}
