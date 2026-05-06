import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full flex-1 flex justify-center items-center">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}
