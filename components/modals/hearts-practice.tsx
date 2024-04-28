"use client";

import { usePracticeModal } from "@/store/use-practice-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

export const PracticeModal: React.FC = () => {
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { isOpen, close } = usePracticeModal();

	useEffect(() => setIsClient(true), []);

	const onClick = () => {
		close();
		router.push("/store");
	};

	if (!isClient) {
		return null;
	}

	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent className="mex-w-md">
				<DialogHeader>
					<div className="flex items-center w-full justify-center mb-5">
						<Image src="/heart.svg" alt="Heart" height={100} width={100} />
					</div>
					<DialogTitle className="text-center font-bold text-2xl">
						{"Practice lesson"}
					</DialogTitle>
					<DialogDescription>
						{
							"Use practice lessons to regain hearts and points. You cannot loose hearts or points in practice lessons."
						}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="mb-4">
					<div className="flex flex-col gap-y-4 w-full">
						<Button
							variant="primary"
							className="w-full"
							size="lg"
							onClick={close}
						>
							I understand
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
