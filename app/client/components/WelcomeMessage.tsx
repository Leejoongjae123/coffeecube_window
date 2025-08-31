"use client";

import { User } from "../types";

interface WelcomeMessageProps {
  user: User;
}

export default function WelcomeMessage({ user }: WelcomeMessageProps) {
  const getUserName = () => {
    if (user.user_metadata?.name) {
      return user.user_metadata.name;
    }
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return "사용자";
  };

  return (
    <div className="text-start mb-8">
      <h1 className="text-[32px] font-bold text-[#F=2E2E2E]">
        {getUserName()}님, 환영합니다.
      </h1>
    </div>
  );
}
