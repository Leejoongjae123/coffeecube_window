"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/master");
  };

  return       <Button
        variant="outline"
        onClick={logout}
        className="text-[24px] text-black w-[158px] h-[69px] bg-[#E3E3E3]"
      >
        <Image src="/logout.svg" alt="logout" width={24} height={24} />
        로그아웃
      </Button>;
}
