import { Router } from "express";
import { watch } from "../controllers/watch.controller.js";

const router = Router();

router.get("/:key", watch);

export default router;
