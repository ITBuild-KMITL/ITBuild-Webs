"use client"

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { BetterAuthError } from "better-auth";
import { CircleQuestionMark, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa";
import { toast } from "sonner";
import AccountCard from "./_components/AccoutCard";
import axios from "axios";
import Link from "next/link";

export default function Page() {

    const [isDiscordLoading, setDiscordLoading] = useState(false)
    const [isAccountLoading, setAccountLoading] = useState(true)
    const { linkSocial, listAccounts, unlinkAccount } = authClient
    const [accounts, setAccounts] = useState<{ id: string; provider: string; createdAt: Date; updatedAt: Date; accountId: string; scopes: string[] }[]>([]);

    useEffect(() => {
        accountLoadHanddle()
    }, []);

    async function accountLoadHanddle() {
        setAccountLoading(true)
        try {
            const { data, error } = await listAccounts()
            if (error) {
                toast.error("เกิดข้อผิดพลาดการดึงข้อมูลบัญชีที่เชื่อมต่อ", {
                    description: `${error.message} | ${error.code}`
                })
                return
            }
            setAccounts(data || []);
        }
        catch (e) {
            if (e instanceof Error) {
                toast.error("เกิดข้อผิดพลาดการดึงข้อมูลบัญชีที่เชื่อมต่อ", {
                    description: `${e.message} | ${e.cause}`
                })
            }
        }
        finally {
            await setAccountLoading(false)
        }
    }

    async function discordJoinHanddle() {
        setDiscordLoading(true)
        try {
            await linkSocial({
                provider: "discord",
                callbackURL: "/account/discord"
            })
            await axios.get(`${process.env.BETTER_AUTH_URL}/api/discord`,
                { withCredentials: true }
            )
        }
        catch (e) {
            await unlinkAccount({ providerId: "discord" })
            if (e instanceof BetterAuthError) {
                toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อบัญชี", {
                    description: `รหัสข้อผิดพลาด ${e.message} | ${e.cause}`
                })
            }
        }
        finally {
            await setDiscordLoading(false)
        }
    }

    return (
        <>
            <CardHeader>
                <CardTitle>
                    <h1 className="text-4xl font-inter font-bold">
                        {"<"}Discord Connect{"/>"}
                    </h1>
                </CardTitle>
                <CardDescription>
                    <p>Discord เป็นช่องทางการติดต่อสื่อสารหลักของทางชุมนุม เรามีความจำเป็นต้องยืนยันว่าบัญชี Discord ของคุณคือคุณจริงๆ เราจึงต้องให้คุณผูกบัญชี Discord ของคุณกับ Website เพื่อยืนยันตัวตน</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

                <div>
                    <CardTitle>
                        <h2 className="text-2xl">การเชื่อมต่อ</h2>
                    </CardTitle>
                    <CardDescription className="mb-4">
                        <p>เชื่อมต่อ Discord เพื่อรับยศใน Server Discord Creasy</p>
                    </CardDescription>
                    {isAccountLoading ?
                        (
                            <div className="bg-yellow-200 rounded-md p-4 animate-pulse">
                                <h1 className="text-xl font-bold text-center text-yellow-600">
                                    กำลังตรวจสอบข้อมูล
                                </h1>
                                <p className="text-center text-yellow-600 text-sm">
                                    ระบบกำลังตรวจสอบข้อมูล
                                    <Tooltip>
                                        <TooltipTrigger className="ml-2">
                                            <CircleQuestionMark className="inline h-4 w-4" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Fetching data..</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </p>
                            </div>
                        )
                        : (
                            <div>
                                {accounts.filter(account => account.provider === "discord").map((account) => (
                                    <AccountCard key={account.id} account={account} />
                                ))}
                            </div>
                        )}
                    <div>
                        {!isAccountLoading && accounts.filter(account => account.provider === "discord").length === 0 && (
                            <>
                                <div className="bg-red-200 rounded-md p-4 mb-4">
                                    <h1 className="text-xl font-bold text-center text-red-600">
                                        ยังไม่ได้เชื่อมต่อเว็บไซต์ กับ Discord
                                    </h1>
                                    <p className="text-center text-red-600 text-sm">
                                        เชื่อมต่อ Discord เพื่อเริ่มพูดคุย
                                        <Tooltip>
                                            <TooltipTrigger className="ml-2">
                                                <CircleQuestionMark className="inline h-4 w-4" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>เราจะตรวจสอบความเป็นสมาชิกชมรมของบัญชี Discord โดยการตรวจสอบความเชื่อมโยงกับเว็บไซต์</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </p>
                                </div>
                                <Button onClick={discordJoinHanddle}>
                                    {isDiscordLoading ? <Loader2 className="animate-spin" /> : <FaDiscord />}
                                    เชื่อมต่อ Discord
                                </Button>
                            </>
                        )}
                    </div>

                </div>
                <div>
                    <CardTitle>
                        <h2 className="text-2xl">เข้าร่วม Discord ของชุมนุม</h2>
                    </CardTitle>
                    <CardDescription className="mb-4">
                        <p>การติดต่อสื่อสารหลักของชุมนุม Creasy จะใช้ Discord สำหรับการพูดคุย การทำกิจกรรม หรือการประชาสัมพันธ์</p>
                    </CardDescription>
                </div>
                    <div>
                        <Button variant={"secondary"} className="cursor-not-allowed">พร้อมใช้งานเร็วๆนี้</Button>
                    </div>
            </CardContent>
        </>
    )
}