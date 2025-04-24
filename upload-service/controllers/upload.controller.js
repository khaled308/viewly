import { uploadToS3 } from "../services/uploadFile.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/async-handler.js";

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError("No file uploaded", 400);
  }

  const { originalname, buffer } = req.file;

  const s3Key = `nodejs/${Date.now()}_${originalname}`;

  await uploadToS3(s3Key, buffer);

  res.status(200).json({ message: "File uploaded successfully" });
});
