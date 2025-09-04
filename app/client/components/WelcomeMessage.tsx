"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "../types";
import Image from "next/image";
interface WelcomeMessageProps {
  user: User;
}

export default function WelcomeMessage({ user }: WelcomeMessageProps) {
  const router = useRouter();
  const supabase = createClient();

  const getUserName = () => {
    if (user.user_metadata?.name) {
      return user.user_metadata.name;
    }
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user.email) {
      return user.email.split("@")[0];
    }
    return "사용자";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-[32px] font-bold text-[#F=2E2E2E]">
        {getUserName()}님, 환영합니다.
      </h1>
      <Button
        variant="outline"
        onClick={handleLogout}
        className="text-[24px] text-black w-[158px] h-[69px] bg-[#E3E3E3]"
      >
        <Image src="/logout.svg" alt="logout" width={24} height={24} />
        로그아웃
      </Button>
    </div>
  );
}
