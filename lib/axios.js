import axios from "axios";

const instance = axios.create({
  baseURL: "https://linkbrary-api.vercel.app/docs/16-이수연",
});

export default instance;
