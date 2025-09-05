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
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createInputRecord = async (inputType: string, amount: number) => {
    try {
      const response = await fetch("/api/input-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input_type: inputType,
          input_amount: amount,
          input_date: new Date().toISOString().split("T")[0],
          robot_code: "123123",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // API에서 받은 에러 정보를 활용
        const errorInfo = {
          title: data.error || "오류 발생",
          message: data.message || "투입 기록 생성에 실패했습니다.",
          ...data,
        };
        throw errorInfo;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleCommand1Click = async () => {
    setModalTitle("원두 투입");
    setIsModalOpen(true);
    setShowErrorAfterProgress(false);
    setIsProcessing(true);

    try {
      // 원두 2.5kg 투입
      await createInputRecord("coffee_bean", 2.5);

      // 성공 시 모달 닫기
      setTimeout(() => {
        setIsModalOpen(false);
        setIsProcessing(false);
        // 페이지 새로고침으로 통계 업데이트
        window.location.reload();
      }, 2000);
    } catch (error: unknown) {
      setIsModalOpen(false);
      setIsProcessing(false);
      const errorObj = error as {
        title?: string;
        error?: string;
        message?: string;
      };
      setErrorTitle(errorObj.title || errorObj.error || "오류 발생");
      setErrorMessage(errorObj.message || "투입 중 오류가 발생했습니다.");
      setIsErrorModalOpen(true);
    }
  };

  const handleCommand2Click = async () => {
    setModalTitle("물 투입");
    setIsModalOpen(true);
    setShowErrorAfterProgress(false);
    setIsProcessing(true);

    try {
      // 물 1.0kg 투입
      await createInputRecord("water", 1.0);

      // 성공 시 모달 닫기
      setTimeout(() => {
        setIsModalOpen(false);
        setIsProcessing(false);
        // 페이지 새로고침으로 통계 업데이트
        window.location.reload();
      }, 2000);
    } catch (error: unknown) {
      setIsModalOpen(false);
      setIsProcessing(false);
      const errorObj = error as {
        title?: string;
        error?: string;
        message?: string;
      };
      setErrorTitle(errorObj.title || errorObj.error || "오류 발생");
      setErrorMessage(errorObj.message || "투입 중 오류가 발생했습니다.");
      setIsErrorModalOpen(true);
    }
  };

  const handleCommand3Click = async () => {
    setModalTitle("우유 투입");
    setIsModalOpen(true);
    setShowErrorAfterProgress(false);
    setIsProcessing(true);

    try {
      // 우유 0.8kg 투입
      await createInputRecord("milk", 0.8);

      // 성공 시 모달 닫기
      setTimeout(() => {
        setIsModalOpen(false);
        setIsProcessing(false);
        // 페이지 새로고침으로 통계 업데이트
        window.location.reload();
      }, 2000);
    } catch (error: unknown) {
      setIsModalOpen(false);
      setIsProcessing(false);
      const errorObj = error as {
        title?: string;
        error?: string;
        message?: string;
      };
      setErrorTitle(errorObj.title || errorObj.error || "오류 발생");
      setErrorMessage(errorObj.message || "투입 중 오류가 발생했습니다.");
      setIsErrorModalOpen(true);
    }
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
          className="flex-1 h-[82px] font-bold rounded-[16px] bg-primary hover:bg-primary/90 text-white text-[24px] font-bold"
          onClick={handleCommand1Click}
          disabled={isProcessing}
        >
          2.5kg 투입
        </Button>

        <Button
          className="flex-1 h-[82px] font-bold rounded-[16px] bg-primary hover:bg-primary/90 text-white text-[24px] font-bold"
          onClick={handleCommand2Click}
          disabled={isProcessing}
        >
          1.0kg 투입
        </Button>

        <Button
          className="flex-1 h-[82px] font-bold rounded-[16px] bg-primary hover:bg-primary/90 text-white text-[24px] font-bold"
          onClick={handleCommand3Click}
          disabled={isProcessing}
        >
          0.8kg 투입
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
        title={errorTitle}
        message={errorMessage}
      />
    </>
  );
}
