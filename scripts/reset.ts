import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	throw new Error("envrionemnt 'DATABASE_URL' is not defined");
}
const sql = neon(DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log("Seeding the database");

		await db.delete(schema.courses);
		await db.delete(schema.userProgress);
		await db.delete(schema.units);
		await db.delete(schema.lessons);
		await db.delete(schema.challenges);
		await db.delete(schema.challengeOptions);
		await db.delete(schema.challengeProgress);
		await db.delete(schema.userSubscription);

		console.log("Resetting finished");
	} catch (error) {
		console.error(error);
		throw new Error("Failed to reset the database");
	}
};

main();
