"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { CircleQuestionMark, Loader2, LogOut, Save } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  firstNameTH: z.string().min(1, "กรุณากรอกชื่อภาษาไทย"),
  lastNameTH: z.string().min(1, "กรุณากรอกนามสกุลภาษาไทย"),
  firstNameEN: z.string().min(1, "กรุณากรอกชื่อภาษาอังกฤษ"),
  lastNameEN: z.string().min(1, "กรุณากรอกนามสกุลภาษาอังกฤษ"),
  major: z.string().min(1, "กรุณาเลือกสาขาวิชาที่เรียน"),
  year: z.number({message:"กรุณาเลือกชั้นปีที่ศึกษา"}).min(0, "กรุณาเลือกชั้นปีที่ศึกษา").max(4, "ชั้นปีที่ศึกษาต้องไม่เกิน 4").optional().nullable(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "หมายเลขโทรศัพท์ต้องมี 10 หลัก")
    .optional(),
});

export default function Register() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ isSignOutLoading, setSignOutLoading ] = useState(false);
  const [ isSubmitLoading, setSubmitLoading ] = useState(false);

  const { useSession, signOut: signout , updateUser } = authClient;
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstNameTH: "",
      lastNameTH: "",
      firstNameEN: "",
      lastNameEN: "",
      major: "",
      phone: "",
    },
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    if (isLoaded) return;
    if (session?.user) {
      form.setValue("firstNameTH", session.user.firstNameTH || "");
      form.setValue("lastNameTH", session.user.lastNameTH || "");
      form.setValue("firstNameEN", session.user.firstNameEN || "");
      form.setValue("lastNameEN", session.user.lastNameEN || "");
      form.setValue("major", session.user.major || "");
    }
    if (session?.user.role === "guest") {
      form.setValue("year", 0);
      form.setValue("major", "ผู้เยี่ยมชม");
    }
    setIsLoaded(true);
  }, [session]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await setSubmitLoading(true)
    await updateUser({
      ...values,
      registered: true,
    });
    await setSubmitLoading(false)
  }

  async function signOut() { 
    await setSignOutLoading(true);
    try {
      await signout()
    }
    catch (error) { 
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ", {
        description: "โปรดลองอีกครั้งในภายหลัง หรือรีโหลดหน้าเว็บ",
    });
    }
    finally {
      await setSignOutLoading(false);
    }
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-inter font-bold">
            {"<"}Creasy{"/>"}
          </h1>
        </CardTitle>
        <CardDescription>
          <p>สมัครสมาชิกชุมนุม</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full space-y-4">
        <p className="max-w-full truncate text-sm text-zinc-500">
          คุณกำลังดำเนินการด้วย{" "}
          <span className="font-medium text-black">{session?.user.email}</span>
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {session?.user.stdId && (
              <div className="space-y-2">
                <FormLabel>รหัสนักศึกษา</FormLabel>
                <FormControl>
                  <Input
                    placeholder="6X07XXXX"
                    value={session?.user.stdId}
                    readOnly
                  />
                </FormControl>
              </div>
            )}
            <FormField
              control={form.control}
              name="firstNameEN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ (ภาษาอังกฤษ)</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastNameEN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>นามสกุล (ภาษาอังกฤษ)</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstNameTH"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ (ภาษาไทย)</FormLabel>
                  <FormControl>
                    <Input placeholder="จอห์น" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastNameTH"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>นามสกุล (ภาษาไทย)</FormLabel>
                  <FormControl>
                    <Input placeholder="โด" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เบอร์โทรศัพท์</FormLabel>
                  <FormControl>
                    <Input placeholder="0812345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {session?.user.role !== "guest" && (
              <>
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สาขาวิชา</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full max-w-full truncate">
                            <SelectValue placeholder="เลือกสาขาวิชา" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="it">
                            สาขาวิชาเทคโนโลยีสารสนเทศ (IT)
                          </SelectItem>
                          <SelectItem value="dsba">
                            สาขาวิชาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ
                            (DSBA)
                          </SelectItem>
                          <SelectItem value="ait">
                            สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์ (AIT)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชั้นปีที่ศึกษา</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full max-w-full truncate">
                            <SelectValue placeholder="เลือกชั้นปีที่ศึกษา" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">ปี 1</SelectItem>
                          <SelectItem value="2">ปี 2</SelectItem>
                          <SelectItem value="3">ปี 3</SelectItem>
                          <SelectItem value="4">ปี 4</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {session?.user.role === "guest" && (
              <p>
                คุณไม่สามารถสมัครสมาชิกชุมนุมได้
                <Tooltip>
                  <TooltipTrigger className="ml-2">
                    <CircleQuestionMark className="inline h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      บทบาทของคุณไม่สามารถสมัครสมาชิกชุมนุมได้
                      ตรวจสอบให้มั่นใจว่าคุณได้เข้าสู่ระบบดอีเมล @kmitl.ac.th
                    </p>
                  </TooltipContent>
                </Tooltip>
              </p>
            )}

            {form.formState.isValid ? (
              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                variant={"default"}
                size={"lg"}
                disabled={isSubmitLoading}
              >
                {isSubmitLoading ? <Loader2 className="animate-spin" /> : <Save />}
                {session?.user.role === "member"
                  ? "สมัครสมาชิกชุมนุม"
                  : "บันทึกข้อมูล"}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full hover:cursor-not-allowed"
                variant={"secondary"}
                size={"lg"}
              >
                <Save />
                {session?.user.role === "member"
                  ? "สมัครสมาชิกชุมนุม"
                  : "บันทึกข้อมูล"}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t" />
      <CardFooter>
        <Button
          variant={"destructive"}
          size={"lg"}
          className="w-full hover:cursor-pointer"
          onClick={() => signOut()}
        >
          {isSignOutLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <LogOut />
          )}
          ออกจากระบบ
        </Button>
      </CardFooter>
    </Card>
  );
}
