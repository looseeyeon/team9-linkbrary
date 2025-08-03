import AddLinks from "@/components/AddLinks";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import LinkList from "@/components/LinkList.js";
import { getLinks, createLinks, getLinksByFolderId } from "@/lib/api_links";
import { getFolders } from "@/lib/api_folders";
import styles from "@/styles/links.module.css";
import Footer from "@/components/Footer";
import FolderList from "@/components/Folder";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import AddInFolderModal from "@/components/Modals/AddInFolderModal";

export default function LinkPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [links, setLinks] = useState([]);
  const [isLoadingLinks, setIsLoadingLinks] = useState(false);
  const [inputLink, setInputLink] = useState("");
  const [folders, setFolders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState("전체");
  const [isOpen, setIsOpen] = useState(false);
  const [modalSelectedFolder, setModalSelectedFolder] = useState(null);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setIsLoadingLinks(true);
    try {
      let response;
      if (selectedFolderId) {
        response = await getLinksByFolderId(
          user.token,
          selectedFolderId,
          page,
          9
        );
      } else {
        response = await getLinks(page, 9, user.token);
      }
      setLinks(response.list || []);
      setTotalPages(Math.ceil((response.totalCount || 0) / 9));
    } catch (error) {
      console.error("Error loading links:", error);
      setLinks([]);
    } finally {
      setIsLoadingLinks(false);
    }
  };

  // 로그인 확인 및 링크 데이터 로드
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
    } else {
      const loadLinks = async () => {
        try {
          setIsLoadingLinks(true);
          let response;
          if (selectedFolderId) {
            response = await getLinksByFolderId(
              user.token,
              selectedFolderId,
              currentPage,
              9
            );
          } else {
            response = await getLinks(currentPage, 9, user.token);
          }
          setLinks(response.list || []);
          setTotalPages(Math.ceil((response.totalCount || 0) / 9));
        } catch (error) {
          console.error("Error loading links:", error);
          setLinks([]);
        } finally {
          setIsLoadingLinks(false);
        }
      };

      loadLinks();
    }
  }, [user, isLoading, currentPage, selectedFolderId]);

  // 폴더 데이터 로드 (한 번만)
  useEffect(() => {
    if (isLoading || !user) return;

    const loadFolders = async () => {
      try {
        const folderData = await getFolders(user.token);
        setFolders(folderData);
      } catch (error) {
        console.error("Error loading folders:", error);
      }
    };

    // 폴더가 이미 로드되어 있으면 다시 로드하지 않음
    if (folders.length === 0) {
      loadFolders();
    }
  }, [user, isLoading]);

  // 새 링크 추가 후 처리
  const handleAddLinks = async (folderId) => {
    try {
      const data = await createLinks(inputLink, folderId, user.token);
      setInputLink("");
      setIsOpen(false);
      setModalSelectedFolder(null);

      // 링크를 추가한 폴더로 자동 이동
      setSelectedFolderId(folderId);
      setCurrentPage(1);

      // 해당 폴더의 링크들 가져오기
      let response;
      if (folderId) {
        response = await getLinksByFolderId(user.token, folderId, 1, 9);
        // 폴더 이름도 업데이트
        const selectedFolder = folders.find((folder) => folder.id === folderId);
        setSelectedFolderName(selectedFolder ? selectedFolder.name : "전체");
      } else {
        response = await getLinks(1, 9, user.token);
        setSelectedFolderName("전체");
      }

      setLinks(response.list || []);
      setTotalPages(Math.ceil((response.totalCount || 0) / 9));

      // 폴더 정보 새로고침 (linkCount 업데이트)
      try {
        const updatedFolders = await getFolders(user.token);
        setFolders(updatedFolders);
      } catch (folderError) {
        console.error("Error refreshing folders:", folderError);
      }
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    setCurrentPage(1); // 폴더 변경 시 첫 페이지로

    // 선택된 폴더 이름 설정
    if (folderId) {
      const selectedFolder = folders.find((folder) => folder.id === folderId);
      setSelectedFolderName(selectedFolder ? selectedFolder.name : "전체");
    } else {
      setSelectedFolderName("전체");
    }
  };

  const handleModalFolderClick = (folder) => {
    setModalSelectedFolder(folder);
  };

  const handleModalAddClick = () => {
    if (modalSelectedFolder) {
      handleAddLinks(modalSelectedFolder.id);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setModalSelectedFolder(null);
  };

  return (
    <div className={styles.linksPageWrapper}>
      <Header />
      <AddLinks
        inputLink={inputLink}
        setInputLink={setInputLink}
        onAddButtonClick={() => {
          if (inputLink.trim()) {
            setIsOpen(true);
          }
        }}
      />
      <FolderList
        folders={folders}
        selectedFolderId={selectedFolderId}
        handleFolderClick={handleFolderClick}
      />
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{selectedFolderName}</h1>
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

      {isOpen && (
        <AddInFolderModal
          folders={folders}
          selectedFolder={modalSelectedFolder}
          onFolderClick={handleModalFolderClick}
          onAdd={handleModalAddClick}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
