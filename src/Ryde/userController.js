import { sql } from "./rydedb.js";

export async function addUser(req, res) {
    try {
        const { name, email, clerkId } = req.body;
        console.log(name,email,clerkId)

        if (!name || !email || !clerkId === "undefined") {
            return res.status(400).json({ message: "All fields are required" })
        }

        const response = await sql`
            INSERT INTO users (name, email, clerk_id) VALUES (
            ${name}, ${email}, ${clerkId}
            );`;

        res.status(201).json(response[0]);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getDrivers(req, res) {
    try {
        const response = await sql`SELECT * FROM drivers`;

        res.status(201).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function getFood(req, res) {
    try {
        const response = await sql`SELECT * FROM food`;

        res.status(201).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}