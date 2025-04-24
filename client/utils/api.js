import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UPLOAD_SERVICE_URL,
});

export default api;
