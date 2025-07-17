import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { X } from "lucide-react";
import { toast } from "sonner";

interface AccountInfo {
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string;
        discordEmail: string;
        discordId: string;
        discordAvaterImage: string;
        discordUsername: string;
        isDiscordConnect: boolean;
    };
    data: {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: number;
        flags: number;
        banner: string | null;
        accent_color: number | null;
        global_name: string | null;
        avatar_decoration_data: any | null;
        collectibles: any | null;
        display_name_styles: any | null;
        banner_color: string | null;
        clan: {
            identity_guild_id: string;
            identity_enabled: boolean;
            tag: string;
            badge: string;
        };
        primary_guild: {
            identity_guild_id: string;
            identity_enabled: boolean;
            tag: string;
            badge: string;
        };
        mfa_enabled: boolean;
        locale: string;
        premium_type: number;
        email: string;
        verified: boolean;
        image_url: string;
    };
}

export default function AccountCard({ account }: { account: { id: string; provider: string; createdAt: Date; updatedAt: Date; accountId: string; scopes: string[] } }) {
    const { unlinkAccount, accountInfo } = authClient
    const [accountInfoData, setAccountInfoData] = useState<AccountInfo | null>(null)
    const [isAccountLoading, setAccountLoading] = useState(false)

    async function unlinkAccountHanddle() {
        await unlinkAccount({ providerId: "discord", accountId: account.accountId })
    }

    async function accountInfoHanddle() {
        setAccountLoading(true)
        try{
            const { data , error } = await accountInfo({ accountId: account.accountId })
            if(error){
                if (error) {
                    toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อบัญชี", {
                        description: `รหัสข้อผิดพลาด ${error.message} | ${error.code}`
                    })
                }
            }
            setAccountInfoData(data as AccountInfo)
            await setAccountLoading(false)
        }
        catch(e){
            if (e instanceof Error) {
                toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อบัญชี", {
                    description: `รหัสข้อผิดพลาด ${e.message} | ${e.cause}`
                })
            }
        }
       
    }

    useEffect(() => {
        accountInfoHanddle()
    }, [])

    return (
        <Card className="h-20 items-center flex-row px-4 gap-2">
            <Image width={75} height={75} alt="" className="max-w-12 max-h-12 block rounded-lg" src={accountInfoData?.user.image || `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png`} />
            <div className="flex-1 flex flex-wrap">
                <CardHeader className="p-0 space-y-0 gap-0 items-center">
                    <Tooltip>
                        <TooltipContent>
                            <p>ID : {accountInfoData?.data.id || "loading..."}</p>
                        </TooltipContent>
                        <TooltipTrigger className="inline w-fit">
                            <CardTitle className="inline-block">
                                <h1 className="text-start inline-block text-base">{accountInfoData?.user.name || accountInfoData?.user.discordUsername || "loading..."}</h1>
                            </CardTitle>
                        </TooltipTrigger>
                    </Tooltip>
                    <CardDescription>
                        <p>{accountInfoData?.user.discordEmail || "loading..."}</p>
                    </CardDescription>
                </CardHeader>
            </div>
        </Card>
    )
}   