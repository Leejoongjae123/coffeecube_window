"use client";

import { Button } from "@/components/ui/button";
import LoginMethods from "@/components/login-methods";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WayIcon from "./icons/WayIcon";
import BarcodeIcon from "./icons/BarcodeIcon";
import LoginIcon from "./icons/LoginIcon";

type ButtonType = "usage" | "barcode" | "login";

export default function MainContent() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<ButtonType | null>(null);

  const getTopImage = () => {
    switch (activeButton) {
      case "usage":
        return "/howtouse.svg";
      case "barcode":
        return "/howtobarcode.svg";
      case "login":
        return "/main.png";
      default:
        return "/main.png";
    }
  };

  const getButtonStyle = (buttonType: ButtonType) => {
    const isActive = activeButton === buttonType;
    return isActive
      ? "w-full h-[120px] text-[32px] text-white font-bold rounded-[16px] bg-primary"
      : "w-full h-[120px] text-[32px] text-primary font-bold rounded-[16px] bg-white border border-primary";
  };

  const getIconColor = (buttonType: ButtonType) => {
    const isActive = activeButton === buttonType;
    return isActive ? "white" : "hsl(142 61% 44%)"; // primary 색상
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen">
      <Button className="absolute bottom-10 left-10 w-20 h-20 bg-[#CECECE] rounded-[20px]" onClick={() => router.push("/master") }>
        <Image src="/mdi_gear.svg" alt="logo" width={32} height={32} className="text-white " />
      </Button>
      <div className="w-full h-[880px] relative">
        <Image src={getTopImage()} alt="logo" fill className="object-cover" />
      </div>
      <div className="flex-1 w-full mt-10">
        <div className="w-full h-[537px] flex  px-20 flex-col gap-y-9 mb-[463px]">
          <div className="flex flex-row gap-x-5 w-full">
            <Button 
              className={getButtonStyle("usage")}
              onClick={() => setActiveButton("usage")}
            >
              <WayIcon 
                className="mr-2"
                fill={getIconColor("usage")}
                style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}
              />
              사용 방법
            </Button>
            <Button 
              className={getButtonStyle("barcode")}
              onClick={() => setActiveButton("barcode")}
            >
              <BarcodeIcon 
                className="mr-2"
                fill={getIconColor("barcode")}
                style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}
              />
              바코드 로그인
            </Button>
            <Button 
              className={getButtonStyle("login")}
              onClick={() => setActiveButton("login")}
            >
              <LoginIcon 
                className="mr-2"
                fill={getIconColor("login")}
                style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px' }}
              />
              ID 로그인
            </Button>
          </div>
          <LoginMethods activeButton={activeButton} />
        </div>
      </div>
    </div>
  );
}
