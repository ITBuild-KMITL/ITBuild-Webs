import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";

export default function Page() {
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
                <div className="bg-yellow-200 rounded-md p-4">
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
                <CardTitle>
                    <h2 className="text-2xl">การเชื่อมต่อ</h2>
                </CardTitle>
            </CardContent>
        </>
    )
}