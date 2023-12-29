import express from "express";
import { getAccount, getAllAccouts } from "../controllers/account.js";

const router = express.Router();

router.get("", getAllAccouts);
router.get("/:uuid", getAccount);

export default router;
