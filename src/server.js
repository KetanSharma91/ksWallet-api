import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js"
import { initDB } from "./config/db.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") job.start();

// middleware
app.use(rateLimiter);
app.use(express.json());

// check api is working or not
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "Ok" });
    console.log("working", process.env.NODE_ENV);
})

// custom middleware
// app.use((req, res, next) => {
//     console.log("Hey we hit a req, the method is ", req.method);
//     next();
// })

app.use("/api/transactions", transactionsRoute)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is up and running on PORT:", PORT);
    });
})