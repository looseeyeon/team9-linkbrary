import AddLinks from "@/components/AddLinks";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import LinkList from "@/components/linkList.js";
import { getLinks, createLinks, getLinksByFolderId } from "@/lib/api_links";
import { getFolders, renameFolder, deleteFolder } from "@/lib/api_folders";
import styles from "@/styles/links.module.css";
import Footer from "@/components/Footer";
import FolderList from "@/components/Folder";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import AddInFolderModal from "@/components/Modals/AddInFolderModal.js";
import EditModal from "@/components/Modals/EditModal.js";
import DeleteModal from "@/components/Modals/DeleteModal.js";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // 폴더 데이터 로드 함수를 컴포넌트 레벨로 이동
  const loadFolders = async () => {
    try {
      const folderData = await getFolders(user.token);
      setFolders(folderData);
    } catch (error) {
      console.error("Error loading folders:", error);
    }
  };

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

  const handleLinkUpdate = async (linkId, newUrl) => {
    try {
      // newUrl이 null이면 삭제된 링크
      if (newUrl === null) {
        // 현재 페이지에서 삭제된 링크 제거
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));

        // 현재 페이지에 링크가 없고 이전 페이지가 있으면 이전 페이지로 이동
        if (links.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        return;
      }

      // 링크 목록을 새로고침 (수정된 경우)
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
    } catch (error) {
      console.error("Error refreshing links after update:", error);
    }
  };

  const handleEditButtonClick = () => {
    if (selectedFolderId) {
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteButtonClick = () => {
    if (selectedFolderId) {
      setIsDeleteModalOpen(true);
    }
  };

  const handleEditConfirm = async (newFolderName) => {
    try {
      setIsLoadingEdit(true);
      await renameFolder(user.token, selectedFolderId, newFolderName);

      // 폴더 목록 새로고침
      const folderData = await getFolders(user.token);
      setFolders(folderData);

      // 현재 선택된 폴더 이름 업데이트
      setSelectedFolderName(newFolderName);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error renaming folder:", error);
      alert("폴더 이름 변경에 실패했습니다.");
    } finally {
      setIsLoadingEdit(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsLoadingDelete(true);
      await deleteFolder(user.token, selectedFolderId);

      // 폴더 목록 새로고침
      const folderData = await getFolders(user.token);
      setFolders(folderData);

      // 전체 폴더로 선택 변경
      setSelectedFolderId(null);
      setSelectedFolderName("전체");

      // 현재 페이지의 링크들 새로고침
      const response = await getLinks(currentPage, 9, user.token);
      setLinks(response.list || []);
      setTotalPages(Math.ceil((response.totalCount || 0) / 9));

      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting folder:", error);
      // 더 구체적인 에러 메시지 표시
      alert(error.message || "폴더 삭제에 실패했습니다.");
    } finally {
      setIsLoadingDelete(false);
    }
  };

  // 폴더 추가 후 새로고침 함수
  const handleFolderAdded = async () => {
    await loadFolders();
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
        onFolderAdded={handleFolderAdded}
      />
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{selectedFolderName}</h1>
        <div className={styles.buttonWrapper}>
          <button className={styles.shareButton}>
            <Image src="/assets/share.png" alt="add" width={47} height={18} />
          </button>
          {selectedFolderId && (
            <>
              <button
                className={styles.editButton}
                onClick={handleEditButtonClick}
              >
                <Image
                  src="/assets/edit.png"
                  alt="edit"
                  width={74}
                  height={18}
                />
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteButtonClick}
              >
                <Image
                  src="/assets/delete.png"
                  alt="delete"
                  width={47}
                  height={18}
                />
              </button>
            </>
          )}
        </div>
      </div>
      <LinkList
        items={{ list: links }}
        isLoading={isLoadingLinks}
        skeletonCount={9}
        onLinkUpdate={handleLinkUpdate}
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

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEditConfirm}
        currentFolderName={selectedFolderName}
        isLoading={isLoadingEdit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        folderName={selectedFolderName}
        isLoading={isLoadingDelete}
      />
    </div>
  );
}
