import { Router } from "express";
import { login, signup } from "../controllers/auth.controllers";
import tryCatch from "../utils/try-catch";

const router = Router();

router.post("/login", tryCatch(login));
router.post("/signup", tryCatch(signup));

export default router;
