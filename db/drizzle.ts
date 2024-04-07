import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	throw new Error("envrionemnt 'DATABASE_URL' is not defined");
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

export default db;
