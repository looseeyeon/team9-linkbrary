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
