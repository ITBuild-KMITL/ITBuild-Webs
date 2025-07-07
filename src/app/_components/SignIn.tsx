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
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { CircleQuestionMark, DoorClosedLocked, DoorOpen } from "lucide-react";

export default function SignIn() {
  const { signIn } = authClient;

  const [policyAccepted, setPolicyAccepted] = useState(false);

  async function signin() {
    try {
      const data = await signIn.social({ provider: "google" });
      console.log(data);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-inter font-bold">
            {"<"}ITBuild{"/>"}
          </h1>
        </CardTitle>
        <CardDescription>
          <p>ศูนย์กลางเทคโนโลยี ไอทีลาดกระบัง</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {policyAccepted ? (
          <Button
            variant="default"
            size={"lg"}
            className="w-full mb-2 text-base hover:cursor-pointer"
            onClick={signin}
          >
            <DoorOpen />
            สมัครสมาชิกชุมนุม / เข้าสู่ระบบ
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size={"lg"}
                className="w-full mb-2 text-base cursor-not-allowed"
                >
                  <DoorClosedLocked />
                สมัครสมาชิกชุมนุม / เข้าสู่ระบบ
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>คุณจำเป็นต้องยินยอมให้เราเก็บข้อมูลของท่าน</p>
            </TooltipContent>
          </Tooltip>
        )}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            onCheckedChange={() => {
              setPolicyAccepted((prev) => !prev);
            }}
          />
          <Label htmlFor="terms" className="text-sm">
            ข้าพเจ้ายินยอมให้ ITBuild เก็บข้อมูลส่วนบุคคล
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-zinc-500 text-sm flex items-center gap-2">
          กรุณาใช้อีเมลาถาบันเพื่อรับสิทธิ์ระดับสมาชิก
          <Tooltip>
            <TooltipTrigger>
              <CircleQuestionMark className="w-4 h-4 text-zinc-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                หากท่านใช้เมลภายนอกสถาบันท่านจะได้รับสิทธิ์ในระดับผู้เยี่ยมชม
                เมลสถาบันคือเมล **07****@kmitl.ac.th
              </p>
            </TooltipContent>
          </Tooltip>
        </p>
      </CardFooter>
    </Card>
  );
}
