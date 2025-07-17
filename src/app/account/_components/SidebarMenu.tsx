import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LinkProps } from "next/link";
import { HomeIcon, LucideProps, User2  } from "lucide-react"
import { FaDiscord } from "react-icons/fa";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import LogoutButton from "@/components/ui/LogoutButton";
import { IconType } from "react-icons/lib";

type InternalLinkProps = {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | IconType
    label: string;
    link: LinkProps
};

export default function SidebarMenu() {

    const userNavigation: Array<InternalLinkProps> = [
        {
            icon: User2,
            label: "ข้อมูลส่วนตัว",
            link: {
                href: "/account"
            }
        },
        {
            icon: FaDiscord,
            label: "เชื่อมต่อ Discord",
            link: {
                href: "/account/discord"
            }
        }
    ];

    const mainNavigation:Array<InternalLinkProps> = [
        {
            icon: HomeIcon,
            label: "หน้าหลัก",
            link: {
                href: "/"
            }
        }
    ]

    return (
        <Card className="md:max-w-sm w-full h-fit">    
            <CardHeader>
                <CardTitle>
                    <h1 className="text-2xl font-bold">
                        {"<"}Account Management{"/>"}
                    </h1>
                </CardTitle>
                <CardDescription>การจัดการบัญชี</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <CardTitle className="mb-2">
                        เมนูหลัก
                    </CardTitle>
                    <div className="flex flex-col gap-2">
                        {mainNavigation.map((link: InternalLinkProps, idx: number) => (
                            <Link key={idx} {...link.link}>
                                <Button className="w-full text-left justify-start text-base" variant={"ghost"} size={"default"}>
                                    <link.icon size={"1.5em"} />
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <CardTitle className="mb-2">
                        ข้อมูลผู้ใช้
                    </CardTitle>
                    <div className="flex flex-col gap-2">
                        {userNavigation.map((link: InternalLinkProps, idx: number) => (
                            <Link key={idx} {...link.link}>
                                <Button className="w-full text-left justify-start text-base" variant={"ghost"} size={"default"}>
                                    <link.icon size={"1.5em"} />
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <CardTitle className="mb-2">
                        ระบบ
                    </CardTitle>
                    <div className="flex flex-col gap-2">
                        <LogoutButton />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}