import { ReadmeClient } from "@/components/readme/readme-client";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Readme({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const readme = await prisma.readme.findUnique({ where: { id } });
  if (!readme) return notFound();

  return (
    <div className="max-w-7xl w-full flex flex-col mx-auto">
      <ReadmeClient id={readme.id} />
    </div>
  );
}
