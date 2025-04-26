import { generateSignedUrlService } from "../services/watch.service.js";
import asyncHandler from "../utils/async-handler.js";

export const watch = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const signedUrl = await generateSignedUrlService(key);
  res.status(200).json({ signedUrl });
});
