import axios from "axios";

const instance = axios.create({
  baseURL: "https://linkbrary-api.vercel.app",
});

export default instance;
