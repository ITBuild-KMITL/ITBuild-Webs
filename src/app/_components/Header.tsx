"use client"

import { Button } from "@/components/ui/button";
import { Loader2, LogIn, User } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Header() {
    const { useSession } = authClient;
    const { data: session, isPending } = useSession();

    return (
        <div className="z-40 w-full h-16 bg-white flex items-center justify-center rounded-b-xl shadow">
            <div className="container flex items-center justify-between px-4">
                <Link href="/">
                    <h1 className="text-2xl font-bold p-1 rounded-lg font-inter hover:opacity-75">{"<Creasy/>"}</h1>
                </Link>
                <div>
                    <ul>
                        <li>
                            <Link href="/account">
                                <Button className="font-bold">
                                    {isPending ? <Loader2 className="animate-spin" /> : session ? <User /> : <LogIn />}
                                    <span className="hidden md:block">
                                        {isPending ? "กำลังโหลด..." : session ? session.user.name : "เข้าสู่ระบบ / สมัครสมาชิกชุมนุม"}
                                    </span>
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}