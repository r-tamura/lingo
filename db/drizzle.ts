import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	throw new Error("envrionemnt 'DATABASE_URL' is not defined");
}

const pool = new Pool({ connectionString: DATABASE_URL });

const db = drizzle(pool, { schema });

export default db;
