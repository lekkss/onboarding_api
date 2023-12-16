import express from "express";
import { createDocument, getDocuments } from "../controllers/document.js";

const router = express.Router();

router.route("").get(getDocuments).post(createDocument);

export default router;
