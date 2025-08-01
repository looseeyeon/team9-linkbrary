import axios from "./axios";

export const getFolders = async (token) => {
  try {
    const response = await axios.get("/folders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 응답 데이터 확인
    console.log("Folders response:", response);
    console.log("Response data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    console.error("Error response:", error.response);
    console.error("Error response data:", error.response?.data);
    throw error;
  }
};
