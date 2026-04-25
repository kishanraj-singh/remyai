import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Link href="/login">
        <Button>
          Get Started <ArrowRightIcon />
        </Button>
      </Link>
    </div>
  );
}
