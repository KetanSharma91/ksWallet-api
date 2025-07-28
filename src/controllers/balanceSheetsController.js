import { sql } from "../config/db.js";

export async function getSheetsByUserid(req, res) {
    try {
        const { userId } = req.params;

        const sheets = await sql`
        SELECT * FROM balancesheet WHERE user_id = ${userId}  ORDER BY created_at DESC`

        console.log(userId);
        res.status(201).json(sheets);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function createSheet(req, res) {
    try {
        const { user_id, title } = req.body

        if (!user_id || !title === undefined) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const sheet = await sql`
        INSERT INTO balancesheet(user_id,title)
        VALUES (${user_id},${title})
        RETURNING *
        `;

        console.log(sheet);
        res.status(201).json(sheet[0]);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteSheet(req, res) {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invaild Sheet id" })
        }

        const result = await sql`
        DELETE FROM balancesheet WHERE id = ${id} RETURNING *
        `;

        if (result.length === 0) {
            return res.status(404).json({ message: "Sheet not found" });
        }

        res.status(200).json({ message: "Sheet deleted successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}