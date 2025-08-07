import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { postJob, getAllJobs, getASingleJob, getMyJobs, deleteJob, updateJobStatus } from "../controllers/jobController.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Admin"), postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Admin"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteJob);
router.get("/get/:id", getASingleJob);
router.put("/active/:id", updateJobStatus);





export default router;
