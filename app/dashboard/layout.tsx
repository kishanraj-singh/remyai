import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col pt-18">
      <DashboardHeader />
      <main className="flex-1 flex px-[5%] py-10">{children}</main>
    </div>
  );
}
