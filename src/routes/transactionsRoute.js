import express from "express";

import { createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserid } from "../controllers/transactionsController.js"

const router = express.Router();

// get transactions of user
router.get("/:userId/:sheetId", getTransactionsByUserid);

// enter the transactions
router.post("/add", createTransaction);

// delete transaction
router.delete("/delete/:id", deleteTransaction);

// get transactions summary
router.get("/summary/:userId/:sheetId", getSummaryByUserId);

export default router;