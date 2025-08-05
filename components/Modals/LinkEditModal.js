import { forwardRef } from "react";
import styles from "@/styles/Modals/LinkEditModal.module.css";
import { useState } from "react";
import EditLinkModal from "./EditLinkModal";
import DeleteLinkModal from "./DeleteLinkModal";

const LinkEditModal = forwardRef(({ onEdit, onDelete, currentUrl, onClose }, ref) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = (newUrl) => {
    onEdit(newUrl);
    if (onClose) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div ref={ref} className={styles.linkEditModal}>
      <div className={styles.deleteWrapper} onClick={handleDeleteClick}>
        <div className={styles.deleteButton}>삭제하기</div>
      </div>
      <div className={styles.editWrapper} onClick={handleEditClick}>
        <div className={styles.editButton}>수정하기</div>
      </div>
      {isEditModalOpen && (
        <EditLinkModal 
          isOpen={isEditModalOpen} 
          onClose={handleCloseEditModal}
          onEdit={handleEditSubmit}
          currentUrl={currentUrl}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteLinkModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteConfirm}
          linkUrl={currentUrl}
        />
      )}
    </div>
  );
});

LinkEditModal.displayName = "LinkEditModal";

export default LinkEditModal;
