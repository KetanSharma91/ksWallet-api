import { neon } from "@neondatabase/serverless";

import "dotenv/config";

export const sql = neon(process.env.RYDE_DATABASE_URL);