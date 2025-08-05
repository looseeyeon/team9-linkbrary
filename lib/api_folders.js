import axios from "./axios";

export const getFolders = async (token) => {
  try {
    const response = await axios.get("/folders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    throw error;
  }
};

export const getFolder = async (token, folderId) => {
  try {
    const response = await axios.get(`/folders/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching folder:", error);
    throw error;
  }
};

export const renameFolder = async (token, folderId, newName) => {
  try {
    const response = await axios.put(
      `/folders/${folderId}`,
      { name: newName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error renaming folder:", error);
    throw error;
  }
};

export const deleteFolder = async (token, folderId) => {
  try {
    const response = await axios.delete(`/folders/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting folder:", error);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);

    // 더 구체적인 에러 메시지 제공
    if (error.response?.status === 400) {
      throw new Error("폴더에 링크가 있어서 삭제할 수 없습니다.");
    } else if (error.response?.status === 404) {
      throw new Error("폴더를 찾을 수 없습니다.");
    } else if (error.response?.status === 401) {
      throw new Error("인증이 필요합니다.");
    } else if (error.response?.status === 403) {
      throw new Error("삭제 권한이 없습니다.");
    } else {
      throw new Error(
        `폴더 삭제에 실패했습니다: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  }
};

export const createFolder = async (token, folderName) => {
  try {
    const response = await axios.post(
      `/folders`,
      { name: folderName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};