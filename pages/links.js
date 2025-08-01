import AddLinks from "@/components/AddLinks";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import LinkList from "@/components/linkList";
import { getLinks, createLinks } from "@/lib/api_links";
import styles from "@/styles/links.module.css";
import Footer from "@/components/Footer";

export default function LinkPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [links, setLinks] = useState([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [inputLink, setInputLink] = useState("");

  // 로그인 확인 및 링크 가져오기
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    } else {
      handleLoadLinks();
    }
  }, [user, isLoading, router]);

  // 링크 데이터 가져오기 함수
  const handleLoadLinks = async () => {
    setIsLoadingLinks(true);
    const data = await getLinks(1, 10, user.token);
    setLinks(data);
    setIsLoadingLinks(false);
  };

  // 새 링크 추가 후 처리
  const handleAddLinks = async () => {
    const data = await createLinks(inputLink, user.token);
    setLinks((prevLinks) => [...prevLinks, data]);
    setInputLink("");
    handleLoadLinks();
  };

  return (
    <div className={styles.linksPageWrapper}>
      <Header />
      <AddLinks
        inputLink={inputLink}
        setInputLink={setInputLink}
        handleAddLinks={handleAddLinks}
      />
      <LinkList
        items={{ list: links }}
        isLoading={isLoadingLinks}
        skeletonCount={9}
      />
      <Footer />
    </div>
  );
}
