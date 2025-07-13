"use client";
import { authClient } from "@/lib/auth-client";
import Header from "./_components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCog, UserPlus2 } from "lucide-react";

import SharedITPoster from "../../public/images/events/shared-it.jpg"
import Image from "next/image";

export default function Home() {
  const { useSession } = authClient;
  const {
    data: session,
    isPending,
  } = useSession();

  return (
    <>
      <div className="flex flex-col items-center min-h-dvh  relative">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r/increasing from-indigo-200 to-teal-200 opacity-60 -z-10 p-4" />
        <Header />
        <div className="container flex flex-col items-center py-20 px-4 text-center">
          <h2 className="font-extrabold text-5xl mb-4">ชุมนุมเทคโนโลยี คณะไอที สจล.</h2>
          <p className="text-xl max-w-3xl text-center mb-6">เป้าหมายของเราคือเป็นศูนย์กลางด้านเทคโนโลยี ของคณะไอที สจล. และ มุ่งเน้นพัฒนาเสริมสร้างความรู้ความสามารถทางด้านไอทีของสมาชิก</p>
          <Link href={"/account"}>
            <Button
              size={"lg"}
              className="text-lg font-bold">
                {session?.user ? 
              <UserPlus2 />
              : 
              <UserCog />
              }
              {session?.user ? "จัดการบัญชีของฉัน" :"สมัครสมาชิกชุมนุม"}
              
            </Button>
          </Link>
        </div>
        <div className="rounded-xl bg-white shadow py-10 px-6 w-full container overflow-hidden">
              <h2 className="uppercase font-extrabold text-7xl -ml-9 mb-4">Event<span className="text-red-400 text-4xl font-bold">กิจกรรม</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <div className="w-full shadow border border-zinc-200 rounded-2xl">
                  <Image src={SharedITPoster} alt="ShareIT | Creasy.club" className="mb-2 rounded-2xl" />
                  <div className="p-4">
                    <h4 className="text-sm text-rose-400 font-bold">เร็วๆนี้</h4>
                    <h3 className="font-bold text-xl">ShareIT | The First Chapter</h3>
                    <p className="mb-4">กิจกรรม Tech Talk แชร์ความรู้ในสายไอทีที่น่าสนใจ</p>
                  <Button variant={"secondary"} className="w-full hover:cursor-not-allowed">เร็วๆนี้</Button>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </>
  );
}
export const runtime = "edge";