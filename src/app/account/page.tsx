"use client";
import { authClient } from "@/lib/auth-client";
import SignIn from "./_components/SignIn";
import { Card } from "@/components/ui/card";
import Register from "./_components/Register";
import UserCard from "./_components/UserCard";

export default function Home() {
  const { useSession } = authClient;
  const {
    data: session,
    isPending,
  } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-4 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r/increasing from-indigo-200 to-teal-200 opacity-60 -z-10" />
      {!session && !isPending && <SignIn />}
      {isPending && (
        <Card className="max-w-sm w-full flex items-center justify-center content-center gap-2">
          <h1 className="text-xl font-inter font-bold animate-pulse">
            {"<"}ITBuild{"/>"}
          </h1>
          <p className="animate-pulse text-sm">กำลังโหลด...</p>
        </Card>
      )}
      {session && (
        <>
          {!session?.user.registered && !isPending ? (
            <Register />
          ) : (
            <UserCard />
          )}
        </>
      )}
    </div>
  );
}
export const runtime = "edge";