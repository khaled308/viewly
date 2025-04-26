import { Router } from "express";
import { getAllVideos, watch } from "../controllers/watch.controller.js";

const router = Router();

router.get("/:key", watch);
router.get("/", getAllVideos);

export default router;
