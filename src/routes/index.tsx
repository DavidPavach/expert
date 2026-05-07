import { createFileRoute } from "@tanstack/react-router";

// UIs
import Landing from "@/pages/Home/Landing";

export const Route = createFileRoute("/")({
	component: Landing,
});
