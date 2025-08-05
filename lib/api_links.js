import axios from "./axios";

export const getLinks = async (page = 1, pageSize = 10, token) => {
  try {
    const response = await axios.get("/links", {
      params: { page, pageSize }, // URL 쿼리 파라미터
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 전체 응답 데이터 반환 (페이지네이션 정보 포함)
    return response.data;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};

export const createLinks = async (url, folderId, token) => {
  try {
    const response = await axios.post(
      "/links",
      {
        url,
        folderId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating link:", error);
    throw error;
  }
};

export const getLinksByFolderId = async (
  token,
  folderId,
  page = 1,
  pageSize = 100
) => {
  try {
    const response = await axios.get(`/folders/${folderId}/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching links by folder:", error);
    throw error;
  }
};

export const deleteLink = async (token, linkId) => {
  try {
    const response = await axios.delete(`/links/${linkId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting link:", error);
    throw error;
  }
};

export const editLink = async (token, linkId, newUrl) => {
  try {
    const response = await axios.put(
      `/links/${linkId}`,

      { url: newUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error editing link:", error);
    throw error;
  }
};
