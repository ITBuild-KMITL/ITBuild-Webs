"use client";
import { authClient } from "@/lib/auth-client";
import SignIn from "./_components/SignIn";
import { Card } from "@/components/ui/card";
import Register from "./_components/Register";
import UserCard from "./_components/UserCard";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, Menu, User } from "lucide-react";


export default function Home() {
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')

    if (error || error_description) {
      let description = `รหัสข้อผิดพลาด ${error}`
      if (error_description != "undefined") {
        description += ` | ${error_description}`
      }
      toast.error("เกิดข้อผิดพลาด โปรดลองอีกครั้ง", {
        description
      })
    }
  }, [searchParams])

  const { useSession } = authClient;
  const {
    data: session,
    isPending,
  } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r/increasing from-indigo-200 to-teal-200 opacity-60 -z-10" />
      {session?.user.registered && !isPending && (
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
      )}
      {!session && !isPending && <SignIn />}
      {isPending && (
        <Card className="max-w-sm w-full flex items-center justify-center content-center gap-2">
          <h1 className="text-xl font-inter font-bold animate-pulse">
            {"<"}ITBuild{"/>"}
          </h1>
          <p className="animate-pulse text-sm">กำลังโหลด...</p>
        </Card>
      )}
      {session && (
        <>
          {!session?.user.registered && !isPending ? (
            <Register />
          ) : (
            <UserCard isMenuOpen={isMenuOpen} />
          )}
        </>
      )}
    </div>
  );
}
export const runtime = "edge";