import { auth, clerkClient } from "@clerk/nextjs";

export const getIsAdmin = async () => {
	const { userId } = auth();

	if (!userId) {
		return false;
	}
	// auth()が返すUserオブジェクトがundefinedになるため、clerkClientでユーザー情報を取得する
	const user = await clerkClient.users.getUser(userId);

	const group: string = user.publicMetadata.group as unknown as string;

	return group === "admin";
};
