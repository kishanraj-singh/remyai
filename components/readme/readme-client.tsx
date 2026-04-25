"use client";

import { Spinner } from "../ui/spinner";
import { useReadme } from "@/hooks/use-readme";
import { ReadmeForm } from "./readme-form";
import { ReadmePreview } from "./readme-preview";
import { ReadmeToolbar } from "./readme-toolbar";

export function ReadmeClient({ id }: { id: string }) {
  const { readme } = useReadme(id);

  if (!readme)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner className="size-8 text-primary" />
      </div>
    );

  return (
    <div className="flex flex-col">
      <ReadmeToolbar readme={readme} />

      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-10 py-8">
        <ReadmeForm readme={readme} />
        <ReadmePreview readme={readme} />
      </div>
    </div>
  );
}
