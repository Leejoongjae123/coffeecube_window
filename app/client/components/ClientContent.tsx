"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import WelcomeMessage from "./WelcomeMessage";
import UserStats from "./UserStats";
import ActionButtons from "./ActionButtons";
import { User, UserStats as UserStatsType } from "../types";
import { useRouter } from "next/navigation";

interface ClientContentProps {
  user: User;
}

export default function ClientContent({ user }: ClientContentProps) {
  const router = useRouter();
  // 임시 데이터 - 실제로는 API에서 가져와야 함
  const userStats: UserStatsType = {
    totalInput: "15kg",
    todayInput: "0.5kg",
    myPoints: "147p"
  };
  const handleSettingsClick = () => {
    router.push("/master");
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen">
      {/* 설정 버튼 */}
      <Button className="absolute bottom-10 left-20 w-20 h-20 bg-[#CECECE] rounded-[20px]" onClick={handleSettingsClick}>
        <Image src="/mdi_gear.svg" alt="settings" width={32} height={32} className="text-white" />
      </Button>

      {/* 상단 이미지 */}
      <div className="w-full h-[880px] relative">
        <Image src="/main.png" alt="main" fill className="object-cover" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 w-full mt-10 px-20">
        <div className="w-full h-[810px] px-11 py-20 bg-[#F4F4F4] rounded-[16px]">
          {/* 환영 메시지 */}
          <WelcomeMessage user={user} />
          
          {/* 사용자 통계 */}
          <UserStats stats={userStats} />
          
          {/* 액션 버튼들 */}
          <ActionButtons />
        </div>
      </div>
    </div>
  );
}
