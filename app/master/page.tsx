"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function MasterPage() {
  const [activeTab, setActiveTab] = useState<"id" | "barcode">("id");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      router.push("/master/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="w-full h-[880px] relative">
        <Image
          src="/main_master.svg"
          alt="main"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-20 max-md:px-5 w-full mt-10">
        <div className="overflow-hidden p-11 w-full rounded-2xl bg-zinc-100 max-md:px-5 max-md:max-w-full">
          <div className="text-3xl font-extrabold text-zinc-800 max-md:max-w-full">
            관리자 로그인
          </div>
          <div className="flex flex-wrap gap-4 items-start mt-8 w-full text-2xl font-extrabold leading-snug text-center max-md:max-w-full">
            <button
              onClick={() => setActiveTab("id")}
              className={`flex flex-col justify-center items-center px-8 py-2.5 rounded-[30px] max-md:px-5 transition-colors ${
                activeTab === "id"
                  ? "text-[#35A53C] bg-[#D6EED5]"
                  : "bg-neutral-200 text-neutral-500"
              }`}
            >
              <div>ID로 로그인</div>
            </button>
            <button
              onClick={() => setActiveTab("barcode")}
              className={`flex flex-col justify-center items-center px-8 py-2.5 rounded-[30px] max-md:px-5 transition-colors ${
                activeTab === "barcode"
                  ? "text-[#35A53C] bg-[#D6EED5]"
                  : "bg-neutral-200 text-neutral-500"
              }`}
            >
              <div>바코드로 로그인</div>
            </button>
          </div>
          
          {activeTab === "id" ? (
            <form onSubmit={handleLogin} className="mt-8 w-full leading-snug whitespace-nowrap max-md:max-w-full">
              {error && (
                <div className="mb-4 p-3 text-red-600 bg-red-50 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="flex flex-wrap gap-5 items-start w-full text-base font-semibold text-neutral-400 max-md:max-w-full">
                <div className="flex flex-col flex-1 shrink justify-center p-6 rounded-xl border border-gray-200 border-solid basis-0 bg-zinc-50 min-w-60 max-md:px-5">
                  <input
                    type="email"
                    placeholder="아이디"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-none placeholder:text-neutral-400 text-neutral-700"
                    required
                  />
                </div>
                <div className="flex flex-1 shrink justify-between items-center px-6 py-6 rounded-xl border border-gray-200 border-solid basis-0 bg-zinc-50 min-w-60 max-md:px-5">
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent outline-none placeholder:text-neutral-400 text-neutral-700 w-full"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex flex-col justify-center items-center p-6 mt-6 w-full text-[24px] font-extrabold text-center text-white bg-green-600 rounded-xl h-[82px]"
              >
                <div>{isLoading ? "로그인 중..." : "로그인"}</div>
              </button>
            </form>
          ) : (
            <div className="mt-8 w-full">
              <div className="text-xl text-zinc-600 max-md:max-w-full">
                스마트폰을 통해 앱 로그인 후, 생성된 바코드를 화면 하단의 바코드리더기에 스캔해주세요.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
