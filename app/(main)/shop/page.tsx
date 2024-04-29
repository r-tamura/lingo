import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UserProgress } from "../learn/user-progress";
import { Items } from "./items";

const ShopPage = async () => {
	const userProgressData = getUserProgress();

	const [userProgress] = await Promise.all([userProgressData]);

	if (!userProgress || !userProgress.activeCourse) {
		redirect("/courses");
	}

	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image src="shop.svg" alt="Shop" width={90} height={90} />
				</div>
				<h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
					Shop
				</h1>
				<p className="text-muted-foreground text-center text-lg mb-6">
					Spend your points on cool stuff.
				</p>
				<Items
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={false} // TODO: Add subscription
				/>
			</FeedWrapper>
		</div>
	);
};

export default ShopPage;
