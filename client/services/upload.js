import api from "@/utils/api";

export const initializeUpload = async (data) => {
  const response = await api.post("/upload/initialize", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const uploadChunk = async (data) => {
  const response = await api.post("/upload/chunk", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const completeUpload = async (data) => {
  const response = await api.post("/upload/complete", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
