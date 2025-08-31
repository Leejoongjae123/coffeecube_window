"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function KoreanLoginInterface() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center max-md:max-w-full">
        <div className="flex flex-col justify-center px-20 w-full max-md:px-5 max-md:max-w-full">
          <Card className="overflow-hidden p-11 w-full rounded-2xl bg-zinc-100 text-zinc-800 shadow-none border-none max-md:px-5 max-md:max-w-full">
            <CardContent className="p-0">
              <h1 className="text-3xl font-extrabold max-md:max-w-full">
                로그인 방법
              </h1>
              
              <div className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
                <div className="w-full max-md:max-w-full">
                  <div className="flex gap-2.5 justify-center items-center px-4 py-2.5 w-full text-2xl font-bold rounded bg-zinc-300 min-h-12 max-md:max-w-full">
                    <div className="self-stretch my-auto">
                      바코드 로그인
                    </div>
                  </div>
                  <p className="mt-6 text-xl max-md:max-w-full">
                    스마트폰을 통해 앱 로그인 후, 생성된 바코드를 화면 하단의
                    바코드리더기에 스캔해주세요.
                  </p>
                </div>
                
                <div className="flex flex-col justify-center mt-6 w-full max-md:max-w-full">
                  <div className="flex gap-2.5 justify-center items-center px-4 py-2 w-full text-2xl font-bold rounded bg-zinc-300 min-h-[45px] max-md:max-w-full">
                    <div className="self-stretch my-auto">ID 로그인</div>
                  </div>
                  <p className="mt-6 text-xl max-md:max-w-full">
                    회원가입 시 사용한 ID를 통해 로그인 할 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-5 items-start mt-9 w-full text-3xl font-bold text-center text-white max-md:max-w-full">
            <Button className="flex overflow-hidden flex-1 shrink gap-3 justify-center items-center py-10 bg-green-600 hover:bg-green-700 rounded-2xl basis-0 min-w-60 h-auto">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 8 11 4.16-1.261 8-5.45 8-11V7l-10-5z"/>
              </svg>
              <span className="self-stretch my-auto">사용 방법</span>
            </Button>
            
            <Button className="flex overflow-hidden flex-1 shrink gap-3 justify-center items-center py-10 bg-green-600 hover:bg-green-700 rounded-2xl basis-0 min-w-60 h-auto">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 5v14c0 1.1.89 2 2 2h14c0-1.1-.9-2-2-2H7c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2s2 .9 2 2v10h2V5c0-2.21-1.79-4-4-4S3 2.79 3 5zm16 0v10h2V5h-2z"/>
              </svg>
              <span className="self-stretch my-auto">바코드 로그인</span>
            </Button>
            
            <Button className="flex overflow-hidden flex-1 shrink gap-3 justify-center items-center py-10 bg-green-600 hover:bg-green-700 rounded-2xl basis-0 min-w-60 h-auto">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.33C15.24 5.59 14.35 6.04 13.56 6.63L12 5.07L10.44 6.63C9.65 6.04 8.76 5.59 7.83 5.33L10.5 2.5L9 1L3 7V9H5V19A2 2 0 0 0 7 21H17A2 2 0 0 0 19 19V9H21Z"/>
              </svg>
              <span className="self-stretch my-auto">ID 로그인</span>
            </Button>
          </div>
        </div>
        
        <div className="object-contain self-center mt-10 w-full max-w-4xl aspect-[1.23] bg-zinc-200 rounded-lg flex items-center justify-center">
          <div className="text-zinc-500 text-xl">바코드 스캐너 영역</div>
        </div>
      </div>
      
      <div className="flex flex-col justify-center items-start px-20 py-14 mt-20 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <Button 
          variant="outline"
          size="icon"
          className="flex gap-3 items-center p-6 w-20 h-20 rounded-3xl border border-solid bg-stone-300 border-stone-300 hover:bg-stone-400"
        >
          <svg
            className="w-8 h-8 text-stone-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
