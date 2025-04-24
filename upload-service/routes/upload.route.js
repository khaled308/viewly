import { Router } from "express";
import { uploadFile } from "../controllers/upload.controller.js";
import multer from "multer";

const router = Router();

const upload = multer();

router.post("/", upload.single("file"), uploadFile);

export default router;
