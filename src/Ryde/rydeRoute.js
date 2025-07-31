import express from "express";
import { addUser, getDrivers, getFood } from "./userController.js";
import { addRide, getRidesByUserid } from "./ridesController.js";

const router = express.Router();

// add the user in neon
router.post("/add", addUser);

// get the drivers
router.get("/drivers", getDrivers);

// add the rides
router.post("/rides/add", addRide);
// get rides of user
router.get("/rides/:userId", getRidesByUserid);

// get the food
router.get("/food", getFood);

// add the transaction
// router.post("/transaction/add", addTransaction);

export default router;