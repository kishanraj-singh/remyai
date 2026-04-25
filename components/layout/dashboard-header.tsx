import { getFirstName } from "@/lib/utils";
import { LogoutButton } from "../auth/logout-button";
import { Logo } from "../shared/logo";
import { auth } from "@/lib/auth";

export async function DashboardHeader() {
  const session = await auth();

  return (
    <header className="w-full px-[5%] bg-card fixed top-0 left-0 shadow-md/5 z-20">
      <div className="max-w-7xl h-18 flex justify-between items-center mx-auto">
        <Logo />

        <div className="flex items-center gap-5">
          <span className="font-semibold">
            Hi, {getFirstName(session?.user?.name || "User")}
          </span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
