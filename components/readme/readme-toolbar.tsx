import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowLeftIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { Readme } from "@prisma/client";
import { toast } from "sonner";

export function ReadmeToolbar({ readme }: { readme: Readme }) {
  const handleCopy = async () => {
    if (!readme.content) return;

    try {
      await navigator.clipboard.writeText(readme.content);
      toast.success("Copied!");
    } catch {
      toast.error("Failed to copy!");
    }
  };

  const handleDownload = async () => {
    if (!readme.content) return;

    const blob = new Blob([readme.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-between items-center">
      <Link href="/dashboard">
        <Button variant="ghost" className="text-muted-foreground">
          <ArrowLeftIcon />
          Back to Dashboard
        </Button>
      </Link>

      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleCopy}>
          <CopyIcon />
          <span className="hidden md:block">Copy Code</span>
        </Button>

        <Button onClick={handleDownload}>
          <DownloadIcon /> <span className="hidden md:block">Download </span>
          .md
        </Button>
      </div>
    </div>
  );
}
