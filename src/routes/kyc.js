import express from "express";
import { completeKyc } from "../controllers/kyc.js";

const router = express.Router();

router.post("/complete", completeKyc);

export default router;
