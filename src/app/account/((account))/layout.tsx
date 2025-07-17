"use client"
import { Card } from "@/components/ui/card";
import SidebarMenu from "../_components/SidebarMenu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, Menu, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { useSession } = authClient;
  const { data: session, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r/increasing from-indigo-200 to-teal-200 opacity-60 -z-10" />
      <div className="container mb-4">
        <Card className="w-full">
          <div className="w-full flex items-center justify-between px-6">
            <Link href={"/"}>
              <h1 className="text-2xl font-bold hover:opacity-75">{"<Creasy/>"}</h1>
            </Link>
            <div>
              <ul className="flex items-center gap-2">
                <li>
                  <Link href="/">
                    <Button className="font-bold">
                      {isPending ? <Loader2 className="animate-spin" /> : session ? <User /> : <LogIn />}
                      <span className="hidden md:block">
                        {isPending ? "กำลังโหลด..." : session ? session.user.name : "เข้าสู่ระบบ / สมัครสมาชิกชุมนุม"}
                      </span>
                    </Button>
                  </Link>
                </li>
                <li>
                  <Button className="font-bold md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full container  flex-col md:flex-row  h-full flex-1 flex gap-4 flex-nowrap">
        <div className={`md:max-w-sm w-full md:block ${isMenuOpen ? "block" : "hidden"}`}>
          <SidebarMenu />
        </div>
        <Card className="flex-1 h-fit">
          {children}
        </Card>
      </div>
    </div>
  );
}