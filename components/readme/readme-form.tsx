"use client";

import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { GlobeIcon, ZapIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReadmeFormSchema, readmeFormSchema } from "@/lib/validation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Readme } from "@prisma/client";
import { useReadme } from "@/hooks/use-readme";
import axios from "axios";

export function ReadmeForm({ readme }: { readme: Readme }) {
  const { mutate } = useReadme(readme.id);
  const form = useForm({
    resolver: zodResolver(readmeFormSchema),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (readme) {
      form.reset({
        projectName: readme.projectName ?? "",
        description: readme.description ?? "",
        techStack: readme.techStack ?? "",
        features: readme.features ?? "",
        repoUrl: readme.repoUrl ?? "",
        liveUrl: readme.liveUrl ?? "",
        license: readme.license ?? "MIT",
        tone: readme.tone ?? "PROFESSIONAL",
        extraInstructions: readme.extraInstructions ?? "",
      });
    }
  }, [readme]);

  const handleSubmit = async (data: ReadmeFormSchema) => {
    setLoading(true);

    try {
      const {
        data: { data: content },
      } = await axios.post("/api/generate", data);
      await axios.patch(`/api/readme/${readme.id}`, { content, ...data });

      mutate();

      const e = document.getElementById("preview");
      e?.scrollIntoView({ behavior: "smooth" });
    } catch {
      toast.error("Failed to generate!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Card className="p-0 gap-0">
        <CardHeader className="h-18 p-4! border-b">
          <CardTitle>Details</CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <Field>
            <FieldLabel>Project Name</FieldLabel>
            <Input
              placeholder="My Awsome Project"
              {...form.register("projectName")}
            />
          </Field>

          <Field>
            <FieldLabel>Short Description</FieldLabel>
            <Textarea
              placeholder="What does your project do? Be concise but clear..."
              {...form.register("description")}
            />
          </Field>

          <Field>
            <FieldLabel>Tech Stack</FieldLabel>
            <Input
              placeholder="Nextjs, Postgres, Typescript..."
              {...form.register("techStack")}
            />
          </Field>

          <Field>
            <FieldLabel>Key Features</FieldLabel>
            <Input
              placeholder="AI Generation, Auth System..."
              {...form.register("features")}
            />
          </Field>

          <Field>
            <FieldLabel>Repository URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <FaGithub />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="https://github.com/user/repo"
                {...form.register("repoUrl")}
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>Live Demo URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <GlobeIcon />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="https://myproject.vercel.app"
                {...form.register("liveUrl")}
              />
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel>License</FieldLabel>
            <Controller
              name="license"
              control={form.control}
              render={({ field }) => (
                <Select
                  defaultValue="MIT"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MIT">MIT</SelectItem>
                      <SelectItem value="APACHE_2_0">Apache 2.0</SelectItem>
                      <SelectItem value="GPL_3_0">GPL-3.0</SelectItem>
                      <SelectItem value="ISC">ISC</SelectItem>
                      <SelectItem value="NONE">None</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <FieldLabel>Tone</FieldLabel>
            <Controller
              name="tone"
              control={form.control}
              render={({ field }) => (
                <Select
                  defaultValue="PROFESSIONAL"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="PROFESSIONAL">Pofessional</SelectItem>
                      <SelectItem value="FRIENDLY">
                        Friendly and Casual
                      </SelectItem>
                      <SelectItem value="MINIMAL">
                        Minimal and Simple
                      </SelectItem>
                      <SelectItem value="DETAILED">Detailed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <FieldLabel>Extra Instructions</FieldLabel>
            <Textarea
              placeholder="Add emojis, include contributing section, methion, Docker setup..."
              {...form.register("extraInstructions")}
            />
          </Field>
        </CardContent>

        <CardFooter className="p-4 border-t">
          <Button className="w-full" type="submit" loading={loading}>
            <ZapIcon /> Generate README
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
