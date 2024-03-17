import { Button } from "@/components/ui/button";
import type * as React from "react";

const ButtonPage: React.FC = () => {
	return (
		<div className="p-4 space-y-2 flex flex-col max-w-[200px]">
			<Button>Default</Button>
			<Button variant={"primary"}>Primary</Button>
			<Button variant="primaryOutline">Primary Outline</Button>
			<Button variant={"secondary"}>Secondary</Button>
			<Button variant="secondaryOutline">Secondary Outline</Button>
			<Button variant={"danger"}>Danger</Button>
			<Button variant="dangerOutline">Danger Outline</Button>
			<Button variant={"super"}>Super</Button>
			<Button variant="superOutline">Super Outline</Button>
			<Button variant="ghost">Super Outline</Button>
			<Button variant={"sidebar"}>Sidebar</Button>
			<Button variant={"sidebarOutline"}>Sidebar Outline</Button>
		</div>
	);
};

export default ButtonPage;
