import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export const GET = async () => {
	if (!(await getIsAdmin())) {
		return new NextResponse("Unauthorized", { status: 403 });
	}
	const data = await db.query.lessons.findMany();
	return NextResponse.json(data);
};

export const POST = async (req: Request) => {
	if (!(await getIsAdmin())) {
		return new NextResponse("Unauthorized", { status: 403 });
	}

	const body = await req.json();
	const data = await db
		.insert(lessons)
		.values({
			...body,
		})
		.returning();
	return NextResponse.json(data[0]);
};
