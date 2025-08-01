import AddLinks from "@/components/AddLinks";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import CardList from "@/components/linkList";
import { getLinks } from "@/lib/api_links";
import styles from "@/styles/links.module.css";
import Footer from "@/components/Footer";


export default function LinkPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [links, setLinks] = useState([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);

  // 로그인 확인 및 링크 가져오기
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    } else {
      fetchLinksData();
    }
  }, [user, isLoading, router]);

  // 링크 데이터 가져오기 함수
  const fetchLinksData = async () => {
    setIsLoadingLinks(true);
    try {
      const linksData = await getLinks(1, 10, user.token); // token 전달 필요 시
      setLinks(linksData);
    } catch (error) {
      console.error("링크 가져오기 실패:", error);
    } finally {
      setIsLoadingLinks(false);
    }
  };

  // 새 링크 추가 후 처리
  const handleLinkAdded = async (newLink) => {
    console.log("새 링크 추가됨:", newLink);
    await fetchLinksData();
  };

 

  return (
    <div className={styles.linksPageWrapper}>
      <Header />
      <AddLinks onLinkAdded={handleLinkAdded} />
      <CardList
        items={{ list: links }}
        isLoading={isLoadingLinks}
        skeletonCount={9}
      />
      <Footer />
    </div>
  );
}
