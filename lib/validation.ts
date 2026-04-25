import z from "zod";

export const readmeFormSchema = z.object({
  projectName: z.string().min(1, "Project name is required."),
  description: z.string().min(1, "Short description is required."),
  techStack: z.string(),
  features: z.string(),
  repoUrl: z.string(),
  liveUrl: z.string(),
  license: z.string(),
  tone: z.string(),
  extraInstructions: z.string(),
});

export type ReadmeFormSchema = z.infer<typeof readmeFormSchema>;
