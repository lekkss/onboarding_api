import express from "express";
import {
  completeSignup,
  initializeSignup,
  login,
  verifySignup,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup/initialize", initializeSignup);
router.post("/signup/verify", verifySignup);
router.post("/signup/:uuid/complete", completeSignup);

export default router;
