import { CreateReadmeDialog } from "@/components/readme/create-readme-dialog";
import { ReadmeList } from "@/components/readme/readme-list";

export default function Dashboard() {
  return (
    <div className="max-w-7xl w-full h-full flex flex-wrap gap-6 mx-auto">
      <CreateReadmeDialog />
      <ReadmeList />
    </div>
  );
}
