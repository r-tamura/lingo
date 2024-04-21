"use client";

import type { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props = {
	initialPercentage: number;
	initialHearts: number;
	initialLessonId: number;
	initialLessonChallenges: (typeof challenges.$inferSelect & {
		completed: boolean;
		challengeOptions: (typeof challengeOptions.$inferSelect)[];
	})[];
	userSubscription: any;
};

export const Quiz = ({
	initialPercentage,
	initialHearts,
	initialLessonId,
	initialLessonChallenges,
	userSubscription,
}: Props) => {
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage);

	return (
		<>
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
			<div className="flex-1">
				<div className="h-full flex items-center justify-center">
					<div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
						<h1> Which of these is an apple?</h1>
					</div>
				</div>
			</div>
		</>
	);
};
