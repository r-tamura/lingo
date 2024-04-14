import type { lessons, units } from "@/db/schema";
import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";

type Lesson = typeof lessons.$inferSelect;

type Props = {
	id: number;
	order: number;
	description: string;
	title: string;
	lessons: (Lesson & { completed: boolean })[];
	activeLesson: (Lesson & { unit: typeof units.$inferSelect }) | undefined;
	activeLessonPercentage: number;
};

export const Unit = ({
	id,
	order,
	description,
	title,
	lessons,
	activeLesson,
	activeLessonPercentage,
}: Props) => {
	return (
		<>
			<UnitBanner title={title} description={description} />
			<div className="flex items-center flex-col relative">
				{lessons.map((lesson, index) => {
					const isCurrent = lesson.id === activeLesson?.id;
					const isLocked = !lesson.completed && !isCurrent;

					return (
						<LessonButton
							key={lesson.id}
							id={lesson.id}
							index={index}
							totalCount={lessons.length - 1}
							current={isCurrent}
							locked={isLocked}
							percentage={activeLessonPercentage}
						/>
					);
				})}
			</div>
		</>
	);
};
