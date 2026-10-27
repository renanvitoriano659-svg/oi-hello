import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/montanha/home-page";

export const Route = createFileRoute("/")({ component: HomePage });
