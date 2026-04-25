"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useReadmes } from "@/hooks/use-readmes";
import { useRouter } from "next/navigation";

export function CreateReadmeDialog() {
  const { mutate } = useReadmes();
  const router = useRouter();
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    const toastId = toast.loading("Creating...");

    try {
      const {
        data: { data: readme },
      } = await axios.post("/api/readme", { title });

      toast.success("Created!", { id: toastId });
      mutate();
      router.push(`/dashboard/readme/${readme.id}`);
    } catch {
      toast.error("Failed to create!", { id: toastId });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-40 h-40 sm:h-50 flex-col"
        >
          <PlusIcon className="size-8 text-primary-foreground rounded-full bg-primary p-2" />
          Create New
        </Button>
      </DialogTrigger>

      <DialogContent className="w-100">
        <DialogHeader>
          <DialogTitle>Create a readme</DialogTitle>
        </DialogHeader>

        <div className="flex">
          <Field>
            <FieldLabel>Readme Title</FieldLabel>
            <Input
              placeholder="My Awesome Readme"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" onClick={handleCreate}>
              Create README
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
