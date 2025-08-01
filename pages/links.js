import AddLinks from "@/components/AddLinks";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import LinkList from "@/components/linkList";
import { getLinks, createLinks } from "@/lib/api_links";
import { getFolders } from "@/lib/api_folders";
import styles from "@/styles/links.module.css";
import Footer from "@/components/Footer";
import FolderList from "@/components/Folder";
import Image from "next/image";
import Pagination from "@/components/Pagination";

export default function LinkPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [links, setLinks] = useState([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [inputLink, setInputLink] = useState("");
  const [folders, setFolders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 페이지 변경 핸들러
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setIsLoadingLinks(true);
    try {
      const response = await getLinks(page, 9, user.token);
      setLinks(response.list || []); // response.list 사용
      setTotalPages(Math.ceil((response.totalCount || 0) / 9));
    } catch (error) {
      console.error("Error loading links:", error);
      setLinks([]); // 에러 시 빈 배열로 설정
    } finally {
      setIsLoadingLinks(false);
    }
  };

  // 로그인 확인 및 데이터 로드
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    } else {
      // 함수들을 useEffect 내부로 이동
      const loadData = async () => {
        try {
          // 링크 로드
          setIsLoadingLinks(true);
          const response = await getLinks(currentPage, 9, user.token);
          setLinks(response.list || []); 
          setTotalPages(Math.ceil((response.totalCount || 0) / 9));
          setIsLoadingLinks(false);

          // 폴더 로드
          const folderData = await getFolders(user.token);
          console.log("Received folders:", folderData);
          setFolders(folderData);
        } catch (error) {
          console.error("Error loading data:", error);
          setIsLoadingLinks(false);
          setLinks([]); // 에러 시 빈 배열로 설정
        }
      };

      loadData();
    }
  }, [user, isLoading, currentPage]);

  // 새 링크 추가 후 처리
  const handleAddLinks = async (folderId) => {
    try {
      const data = await createLinks(inputLink, folderId, user.token);
      setLinks((prevLinks) => [...prevLinks, data]);
      setInputLink("");
      // 링크 다시 로드 (첫 페이지로)
      setCurrentPage(1);
      const response = await getLinks(1, 9, user.token);
      setLinks(response.list || []);
      setTotalPages(Math.ceil((response.totalCount || 0) / 9));
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  return (
    <div className={styles.linksPageWrapper}>
      <Header />
      <AddLinks
        inputLink={inputLink}
        setInputLink={setInputLink}
        handleAddLinks={handleAddLinks}
        folders={folders}
      />
      <FolderList folders={folders} />
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>전체</h1>
        <div className={styles.buttonWrapper}>
          <Image src="/assets/share.png" alt="add" width={47} height={18} />
          <Image src="/assets/edit.png" alt="add" width={74} height={18} />
          <Image src="/assets/delete.png" alt="add" width={47} height={18} />
        </div>
      </div>
      <LinkList
        items={{ list: links }}
        isLoading={isLoadingLinks}
        skeletonCount={9}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
