import api from "@/utils/api";

export const uploadFile = async (data) => {
  const response = await api.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
