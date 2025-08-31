"use client";

import { UserStats as UserStatsType } from "../types";

interface UserStatsProps {
  stats: UserStatsType;
}

export default function UserStats({ stats }: UserStatsProps) {
  return (
    <div className="flex flex-col gap-5 ">
      <div className="w-full h-[126px] bg-[#E7EDE7] py-[32px] px-[52px] rounded-[12px] flex flex-row justify-between items-center">
        <h3 className="font-semibold text-[28px] text-[#255220]">누적 투입량</h3>
        <p className="text-[44px] font-bold text-primary">{stats.totalInput}</p>
      </div>
      
      <div className="w-full h-[126px] bg-[#E7EDE7] py-[32px] px-[52px] rounded-[12px] flex flex-row justify-between items-center">
        <h3 className="font-semibold text-[28px] text-[#255220]">오늘 투입량</h3>
        <p className="text-[44px] font-bold text-primary">{stats.todayInput}</p>
      </div>
      
      <div className="w-full h-[126px] bg-[#E7EDE7] py-[32px] px-[52px] rounded-[12px] flex flex-row justify-between items-center">
        <h3 className="font-semibold text-[28px] text-[#255220]">마이 포인트</h3>
        <p className="text-[44px] font-bold text-primary">{stats.myPoints}</p>
      </div>
    </div>
  );
}
