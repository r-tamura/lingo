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
		await db.insert(schema.courses).values([
			{ id: 1, title: "Spanish", imageSrc: "/es.svg" },
			{ id: 2, title: "Italian", imageSrc: "/it.svg" },
			{ id: 3, title: "French", imageSrc: "/fr.svg" },
			{ id: 4, title: "Croatian", imageSrc: "/hr.svg" },
		]);
		console.log("Seeding finished");
	} catch (error) {
		console.error(error);
		throw new Error("Failed to seed the dabase");
	}
};

main();
