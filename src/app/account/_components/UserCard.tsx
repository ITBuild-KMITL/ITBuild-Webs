import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Book, CircleQuestionMark, IdCard, Loader2, LogOut, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";

export default function UserCard({ isMenuOpen }: { isMenuOpen: boolean }) {

  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const { useSession, signOut } = authClient;
  const session = useSession();
  async function handleLogout() {
    await setIsLogoutLoading(true)
    await signOut()
    await setIsLogoutLoading(false)
  }

  return (
    <div className="w-full md:flex-row flex-col container h-full flex-1 flex gap-4 flex-nowrap">
      <div className={`md:max-w-sm w-full md:block ${isMenuOpen ? "block" : "hidden"}`}>
        <SidebarMenu />
      </div>
      <Card className="flex-1 h-fit">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-inter font-bold">
              {"<"}Creasy{"/>"}
            </h1>
          </CardTitle>
          <CardDescription>
            <p>ระบบสมาชิก Creasy</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full space-y-4">
          <div className="bg-green-200 rounded-md p-4">
            <h1 className="text-xl font-bold text-center text-green-600">
              เราบันทึกข้อมูลของคุณแล้ว
            </h1>
            <p className="text-center text-green-600 text-sm">
              เราจะส่งรายละเอียดให้คุณในภายหลัง
              <Tooltip>
                <TooltipTrigger className="ml-2">
                  <CircleQuestionMark className="inline h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>เราจะส่งรายละเอียดให้คุณภายใน 2 วัน ทางอีเมล</p>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
          <div className="bg-primary-foreground rounded-md p-4 space-y-4">
            <div className="flex items-center gap-4">
              <IdCard />
              <div>
                <p className="font-bold">
                  {session.data?.user.firstNameTH} {session.data?.user.lastNameTH}
                </p>
                <p className="text-sm text-muted-foreground">
                  {session.data?.user.firstNameEN} {session.data?.user.lastNameEN}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail />
              <div>
                <p className="font-bold">{session.data?.user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Book />
              <div>
                <p className="font-bold uppercase">
                  {session.data?.user.major || "ผู้เยี่ยมชม"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {session.data?.user.major == "it"
                    ? "เทคโนโลยีสารสนเทศ"
                    : session.data?.user.major == "dsba"
                      ? "วิทยาการข้อมูลและการวิเคราะห์ธุรกิจ"
                      : session.data?.user.major == "ait"
                        ? "เทคโนโลยีปัญญาประดิษฐ์"
                        : session.data?.user.major == "itbuild"
                          ? "ITBuild"
                          : ""}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

  );
}
