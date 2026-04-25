import { Readme } from "@prisma/client";
import { Card } from "../ui/card";
import { FileSpreadsheetIcon } from "lucide-react";
import Link from "next/link";
import { getTimeAgo } from "@/lib/utils";
import { DeleteReadmeDialog } from "./delete-readme-dialog";

export function ReadmeCard({ readme }: { readme: Readme }) {
  return (
    <div className="w-full sm:w-40 h-40 sm:h-50 group relative">
      <Link href={`/dashboard/readme/${readme.id}`} className="w-full h-full">
        <Card className="w-full h-full bg-secondary flex flex-col justify-center items-center gap-3 rounded-md p-6">
          <FileSpreadsheetIcon className="text-primary" />
          <span className="text-primary font-semibold">{readme.title}</span>

          <span className="text-xs text-muted-foreground absolute bottom-3">
            {getTimeAgo(readme.createdAt)}
          </span>
        </Card>
      </Link>

      <DeleteReadmeDialog id={readme.id} />
    </div>
  );
}
