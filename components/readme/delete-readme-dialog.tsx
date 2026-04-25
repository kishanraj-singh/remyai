"use client";

import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useReadmes } from "@/hooks/use-readmes";
import { toast } from "sonner";
import axios from "axios";

export function DeleteReadmeDialog({ id }: { id: string }) {
  const { mutate } = useReadmes();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");

    try {
      await axios.delete(`/api/readme/${id}`);

      toast.success("Deleted!", { id: toastId });
      mutate();
    } catch (error) {
      toast.error("Failed to delete!", { id: toastId });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          className="text-destructive absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this readme?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete your readme
            permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
