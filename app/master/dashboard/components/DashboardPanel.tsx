"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressModal } from "@/components/ui/progress-modal";
import { ErrorModal } from "@/components/ui/error-modal";
import type { DeviceStatus } from "./types";

export default function DashboardPanel() {
  const [activeTab, setActiveTab] = useState<"status" | "command">("status");
  
  // 컴포넌트 마운트 시 랜덤한 상태로 초기화
  const getRandomStatus = (): DeviceStatus => {
    const statuses: DeviceStatus[] = ["정상", "수거필요", "장애발생"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>(getRandomStatus);
  
  // Modal 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [showErrorAfterProgress, setShowErrorAfterProgress] = useState(false);

  useEffect(() => {
    const statuses: DeviceStatus[] = ["정상", "수거필요", "장애발생"]; 
    const intervalId = setInterval(() => {
      setDeviceStatus((prev) => {
        let next: DeviceStatus = prev;
        let guard = 0;
        while (next === prev && guard < 5) {
          next = statuses[Math.floor(Math.random() * statuses.length)];
          guard += 1;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // 버튼 클릭 핸들러
  const handleCommandClick = (commandNumber: number) => {
    setModalTitle(`장비명령 ${commandNumber}`);
    setIsModalOpen(true);
    // 랜덤으로 50% 확률로 에러 모달 표시 설정
    setShowErrorAfterProgress(Math.random() > 0.5);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (showErrorAfterProgress) {
      setTimeout(() => {
        setIsErrorModalOpen(true);
      }, 500);
    }
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setShowErrorAfterProgress(false);
  };

  const baseTabClass =
    "flex-1 gap-2.5 p-6 text-2xl font-bold leading-8 text-center rounded-3xl cursor-pointer max-md:p-5 max-md:text-2xl max-sm:p-4 max-sm:text-xl h-[82px]";

  const statusTabClass =
    activeTab === "status"
      ? `${baseTabClass} bg-[#D6EED5] text-primary`
      : `${baseTabClass} bg-[#CECECE] text-[#717171]`;

  const commandTabClass =
    activeTab === "command"
      ? `${baseTabClass} bg-[#D6EED5] text-primary`
      : `${baseTabClass} bg-[#CECECE] text-[#717171]`;

  return (
    <>
      <div className="flex gap-4 items-start w-full">
        <button className={statusTabClass} onClick={() => setActiveTab("status")}>
          장비상태
        </button>
        <button className={commandTabClass} onClick={() => setActiveTab("command")}>
          장비명령
        </button>
      </div>

      {activeTab === "status" ? (
        <div className="flex gap-5 justify-between items-start w-full mt-6 max-md:flex-col max-md:gap-4 max-md:items-center">
          <div className="box-border flex flex-col gap-5 items-center px-14 py-11 bg-white rounded-xl w-[252px] max-md:px-10 max-md:py-9 max-md:w-full max-md:max-w-[400px] max-sm:gap-4 max-sm:px-6 max-sm:py-8">
            <div className="gap-2.5 px-5 py-1 text-3xl font-bold w-full bg-gray-200 rounded-[100px] text-zinc-500 max-md:text-2xl max-sm:px-4 max-sm:py-1 max-sm:text-xl">
              총 무게
            </div>
            <div className="flex gap-3 justify-center items-center max-sm:gap-2">
              <div>
                <Image src="/weight.svg" alt="weight" width={40} height={40} />
              </div>
              <div className="text-4xl font-bold leading-[56px] text-neutral-800 max-md:text-4xl max-sm:text-3xl">
                15kg
              </div>
            </div>
          </div>
          <div className="box-border flex flex-col gap-5 items-center py-11 bg-white rounded-xl w-[252px] max-md:px-10 max-md:py-9 max-md:w-full max-md:max-w-[400px] max-sm:gap-4 max-sm:py-8">
            <div className="gap-2.5 px-5 py-1 text-3xl font-bold leading-10 whitespace-nowrap bg-gray-200 rounded-[100px] text-zinc-500 max-md:text-2xl max-sm:px-4 max-sm:py-1 max-sm:text-xl">
              냉장 온도
            </div>
            <div className="flex gap-3 justify-center items-center max-sm:gap-2">
              <div>
                <Image src="/snow.svg" alt="temperature" width={40} height={40} />
              </div>
              <div className="text-4xl font-bold leading-[56px] text-neutral-800 max-md:text-4xl max-sm:text-3xl">
                4°C
              </div>
            </div>
          </div>
          <div className="box-border flex flex-col gap-5 items-center py-11 bg-white rounded-xl w-[252px] max-md:py-9  max-sm:gap-4 max-sm:py-8">
            <div className="gap-2.5 px-5 py-1 text-3xl font-bold leading-10 whitespace-nowrap bg-gray-200 rounded-[100px] text-zinc-500 max-md:text-2xl max-sm:px-4 max-sm:py-1 max-sm:text-xl">
              장비 상태
            </div>
            <div className="flex gap-3 justify-center items-center max-sm:gap-2">
              <div>
                <Image 
                  src={
                    deviceStatus === "정상" ? "/check.svg" :
                    deviceStatus === "수거필요" ? "/refresh.svg" :
                    "/error.svg"
                  } 
                  alt="device" 
                  width={40} 
                  height={40} 
                />
              </div>
              <div className={`text-4xl font-bold leading-[56px] whitespace-nowrap max-md:text-4xl max-sm:text-3xl ${
                deviceStatus === "정상" ? "text-primary" :
                deviceStatus === "수거필요" ? "text-[#0E8FEB]" :
                "text-[#DE1443]"
              }`}>
                {deviceStatus}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 w-full max-md:grid-cols-2 max-sm:grid-cols-1">
          {Array.from({ length: 9 }).map((_, index) => (
            <Button
              key={index}
              className="flex items-center justify-center h-[120px] text-[24px] font-extrabold text-white bg-primary rounded-xl"
              onClick={() => handleCommandClick(index + 1)}
            >
              {`장비명령 ${index + 1}`}
            </Button>
          ))}
        </div>
      )}

      <ProgressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        subtitle="작업이 진행중입니다. 잠시만 기다려주세요."
        progress={50}
        status="진행중"
        robotCode="12345678"
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
      />
    </>
  );
}


