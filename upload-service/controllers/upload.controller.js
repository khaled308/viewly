import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/async-handler.js";
import {
  completeS3MultipartUploadService,
  initializeS3UploadMultiPartService,
  uploadS3ChunkService,
} from "../services/uploadS3.service.js";

export const initializeUpload = asyncHandler(async (req, res) => {
  const { fileName } = req.body;

  if (!fileName) {
    throw new ApiError("Missing required fields", 400);
  }

  const uploadId = await initializeS3UploadMultiPartService(fileName);
  res.status(200).json({ uploadId });
});

export const uploadChunk = asyncHandler(async (req, res) => {
  const { chunkIndex, fileName, uploadId } = req.body;
  const chunk = req.file;

  if (!chunk || !chunkIndex || !uploadId || !fileName) {
    throw new ApiError("Missing required fields", 400);
  }

  const response = await uploadS3ChunkService({
    key: fileName,
    body: chunk.buffer,
    uploadId: uploadId,
    partNumber: +chunkIndex,
  });

  console.log(response);

  res
    .status(200)
    .json({ success: true, ETag: response.ETag, PartNumber: +chunkIndex });
});

export const completeUpload = asyncHandler(async (req, res) => {
  const { fileName, uploadId, parts } = req.body;

  if (!fileName || !uploadId || !parts) {
    throw new ApiError("Missing required fields", 400);
  }

  const response = await completeS3MultipartUploadService({
    key: fileName,
    uploadId: uploadId,
    parts: parts.sort((a, b) => a.PartNumber - b.PartNumber),
  });

  console.log("complete", response);

  res.status(200).json({ message: "File uploaded successfully" });
});
