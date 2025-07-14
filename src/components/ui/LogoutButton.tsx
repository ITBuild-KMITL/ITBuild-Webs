"use client"

import { useState } from "react";
import { Button } from "./button"
import { authClient } from "@/lib/auth-client";
import { Loader2, LogOut } from "lucide-react";

export default function LogoutButton(){
    const [isLogoutLoading, setIsLogoutLoading] = useState(false)
    const { useSession, signOut } = authClient;
    const session = useSession();
    async function handleLogout() {
      await setIsLogoutLoading(true)
      await signOut()
      await setIsLogoutLoading(false)
    }
    return (
        <Button
            onClick={handleLogout}
            disabled={isLogoutLoading}
            variant={"destructive"}
            size={"lg"}
            className="w-full hover:cursor-pointer"
          >
            {isLogoutLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
            ออกจากระบบ
          </Button>
    )
}