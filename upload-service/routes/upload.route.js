import { Router } from "express";
import multer from "multer";
import {
  initializeUpload,
  uploadChunk,
  completeUpload,
} from "../controllers/upload.controller.js";

const router = Router();

const upload = multer();

router.post("/initialize", upload.none(), initializeUpload);
router.post("/chunk", upload.single("chunk"), uploadChunk);
router.post("/complete", upload.none(), completeUpload);

export default router;
