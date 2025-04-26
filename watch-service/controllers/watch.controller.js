import { db } from "../../upload-service/config/db.js";
import { videos } from "../schemas/video.schema.js";
import { generateSignedUrlService } from "../services/watch.service.js";
import asyncHandler from "../utils/async-handler.js";

export const watch = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const signedUrl = await generateSignedUrlService(key);
  res.status(200).json({ signedUrl });
});

export const getAllVideos = asyncHandler(async (req, res) => {
  const data = await db.select().from(videos);
  res.status(200).json(data);
});
