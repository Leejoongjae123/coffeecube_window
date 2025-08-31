"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressModal } from "@/components/ui/progress-modal";
import { ErrorModal } from "@/components/ui/error-modal";

export default function ActionButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [showErrorAfterProgress, setShowErrorAfterProgress] = useState(false);

  const handleCommand1Click = () => {
    setModalTitle("장비명령 1");
    setIsModalOpen(true);
    setShowErrorAfterProgress(false);
  };

  const handleCommand2Click = () => {
    setModalTitle("장비명령 2");
    setIsModalOpen(true);
    setShowErrorAfterProgress(false);
  };

  const handleCommand3Click = () => {
    setModalTitle("장비명령 3");
    setIsModalOpen(true);
    setShowErrorAfterProgress(true);
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

  return (
    <>
      <div className="flex flex-row gap-4 w-full mt-20">
        <Button
          className="flex-1 h-[120px] font-bold rounded-[16px] bg-primary hover:bg-primary/90 text-white text-[24px] font-bold"
          onClick={handleCommand1Click}
        >
          장비명령1
        </Button>

        <Button
          className="flex-1 h-[120px] font-bold rounded-[16px] bg-primary hover:bg-primary/90 text-white text-[24px] font-bold"
          onClick={handleCommand2Click}
        >
          장비명령2
        </Button>

        <Button
          className="flex-1 h-[120px] font-bold rounded-[16px] bg-primary hover:bg-primary/90 text-white text-[24px] font-bold"
          onClick={handleCommand3Click}
        >
          장비명령3
        </Button>
      </div>

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
