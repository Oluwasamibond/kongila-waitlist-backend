import express from "express";
import { createLead, getLeads } from "../controller/leadController.js";

const router = express.Router();

router.post("/", createLead);

router.get("/admin", getLeads);

export default router;
