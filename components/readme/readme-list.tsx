"use client";

import { Readme } from "@prisma/client";
import { ReadmeCard } from "./readme-card";
import { useReadmes } from "@/hooks/use-readmes";

export function ReadmeList() {
  const { readmes } = useReadmes();

  return (
    readmes &&
    readmes.map((readme: Readme) => (
      <ReadmeCard key={readme.id} readme={readme} />
    ))
  );
}
