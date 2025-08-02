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
