import express from "express";

import { getSheetsByUserid, createSheet, deleteSheet } from "../controllers/balanceSheetsController.js"

const router = express.Router();

// get sheet of user
router.get("/:userId", getSheetsByUserid);

// enter the transactions
router.post("/add", createSheet);

// delete transaction
router.delete("/delete/:id", deleteSheet);

export default router;