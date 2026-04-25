import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={cn("font-semibold", size === "lg" ? "text-4xl" : "text-2xl")}
      >
        Remy<span className="text-primary">Ai</span>
      </span>
    </Link>
  );
}
