import express from "express";
import { completeKyc } from "../controllers/kyc.js";
import validateRequest from "../middlewares/validate.js";
import { kycSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post("/complete", validateRequest(kycSchema), completeKyc);

export default router;
