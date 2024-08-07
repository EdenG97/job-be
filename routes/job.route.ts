import { Router } from "express";
import { jobDetail, jobs } from "../controllers/job.controllers";
import { checkAuthentication } from "../middlewares/auth.middleware";
import tryCatch from "../utils/try-catch";

const router = Router();

router.get("/jobs", checkAuthentication, tryCatch(jobs));
router.get("/job/:id", checkAuthentication, tryCatch(jobDetail));

export default router;
