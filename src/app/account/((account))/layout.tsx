import { Card } from "@/components/ui/card";
import SidebarMenu from "../_components/SidebarMenu";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r/increasing from-indigo-200 to-teal-200 opacity-60 -z-10" />
      <div className="w-full container h-full flex-1 flex gap-4 flex-nowrap">
        <SidebarMenu />
        <Card className="flex-1 h-fit">
          {children}
        </Card>
      </div>
    </div>
  );
}