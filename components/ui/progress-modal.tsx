"use client";

import * as React from "react";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  progress?: number;
  status?: string;
  robotCode?: string;
}

const ProgressModal = React.forwardRef<HTMLDivElement, ProgressModalProps>(
  ({
    isOpen,
    onClose,
    title = "장비명령 1",
    subtitle = "작업이 진행중입니다. 잠시만 기다려주세요.",
    progress: initialProgress = 0,
    status: initialStatus = "진행중",
    robotCode = "12345678",
  }, ref) => {
    const [progress, setProgress] = React.useState(0);
    const [status, setStatus] = React.useState(initialStatus);
    const [isCompleted, setIsCompleted] = React.useState(false);

    React.useEffect(() => {
      if (!isOpen) {
        setProgress(0);
        setStatus(initialStatus);
        setIsCompleted(false);
        return;
      }

      // 모달 오픈 시 항상 0%에서 시작
      setProgress(0);

      // 모달이 열리면 자동으로 진행률 시작 - 0.1초마다 2%씩 증가 (5초에 100% 완료)
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setStatus("진행 완료");
            setIsCompleted(true);
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100); // 0.1초마다 2%씩 증가

      return () => clearInterval(interval);
    }, [isOpen, initialProgress, initialStatus]);

    if (!isOpen) return null;

    const radius = 140.8;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div 
          ref={ref}
          className="box-border inline-flex gap-2.5 items-center p-14 rounded-3xl bg-zinc-100 h-[697px] w-[512px] max-md:p-10 max-md:w-full max-md:h-auto max-md:max-w-[480px] max-md:min-h-[600px] max-sm:p-6 max-sm:w-full max-sm:h-auto max-sm:max-w-[360px] max-sm:min-h-[500px]">
          <div className="flex relative flex-col gap-16 items-start w-[400px] max-md:gap-10 max-md:w-full max-sm:gap-8 max-sm:w-full">
            <div className="flex relative flex-col gap-3 justify-center items-center self-stretch">
              <div className="relative text-3xl font-bold text-neutral-600 max-md:text-3xl max-sm:text-2xl">
                {title}
              </div>
              <div className="relative text-base font-semibold text-center text-neutral-400 max-md:text-base max-sm:text-sm">
                {subtitle}
              </div>
            </div>
            
            <div className="flex relative flex-col gap-16 items-center self-stretch">
              <div className="relative w-80 h-80 max-md:h-[280px] max-md:w-[280px] max-sm:w-60 max-sm:h-60">
                {/* Background Circle */}
                <svg
                  className="absolute inset-0"
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter
                      id="filter0_i_766_1066"
                      x="0"
                      y="0"
                      width="320"
                      height="322.667"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2.66667" />
                      <feGaussianBlur stdDeviation="2.66667" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_766_1066"
                      />
                    </filter>
                  </defs>
                  <g filter="url(#filter0_i_766_1066)">
                    <path
                      d="M320 160C320 248.366 248.366 320 160 320C71.6344 320 0 248.366 0 160C0 71.6344 71.6344 0 160 0C248.366 0 320 71.6344 320 160ZM38.4 160C38.4 227.158 92.8422 281.6 160 281.6C227.158 281.6 281.6 227.158 281.6 160C281.6 92.8422 227.158 38.4 160 38.4C92.8422 38.4 38.4 92.8422 38.4 160Z"
                      fill="white"
                    />
                  </g>
                </svg>

                {/* Progress Arc */}
                <svg
                  className="absolute inset-0"
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: `rotate(${-90}deg)` }}
                >
                  <defs>
                    <linearGradient
                      id="paint0_linear_766_1067"
                      x1="19"
                      y1="473"
                      x2="366.133"
                      y2="-293"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.1875" stopColor="#1F9027" />
                      <stop offset="0.543258" stopColor="#69C770" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="160"
                    cy="160"
                    r="140.8"
                    stroke="url(#paint0_linear_766_1067)"
                    strokeWidth="38.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={`${circumference - (progress / 100) * circumference}`}
                    style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
                  />
                </svg>

                {/* Content Overlay */}
                <div className="flex absolute flex-col items-center h-[107px] left-[90px] top-[107px] w-[140px] max-md:left-20 max-md:top-[95px] max-md:w-[120px] max-sm:top-20 max-sm:left-[70px] max-sm:w-[100px]">
                  <div className={`flex relative gap-2.5 justify-center items-center px-4 py-2.5 rounded-[30px] max-sm:px-3 max-sm:py-2 ${isCompleted ? "bg-primary" : "bg-stone-300"}`}>
                    <div className={`relative text-sm font-bold text-center max-sm:text-xs ${isCompleted ? "text-white" : "text-neutral-700"}`}>
                      {status}
                    </div>
                  </div>
                  <div className="relative text-4xl font-bold tracking-normal text-center leading-[50px] text-neutral-800 max-md:text-4xl max-md:leading-10 max-sm:text-3xl max-sm:leading-10 transition-all duration-100 ease-out">
                    {Math.round(progress)}%
                  </div>
                  <div className="relative text-xs font-medium leading-5 text-neutral-400 max-sm:text-xs max-sm:leading-5">
                    비니봇 코드 : {robotCode}
                  </div>
                </div>

                {/* Progress Indicator */}
                {progress > 0 && (
                <svg
                  className="absolute"
                  style={{ 
                    width: "40px", 
                    height: "40px", 
                    left: `${160 + 140.8 * Math.sin((progress / 100) * 2 * Math.PI) - 20}px`, 
                    top: `${160 - 140.8 * Math.cos((progress / 100) * 2 * Math.PI) - 20}px`,
                    transition: "all 0.1s ease-out",
                  }}
                  width="64"
                  height="50"
                  viewBox="0 0 64 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter
                      id="filter0_d_766_1074"
                      x="0"
                      y="0.666667"
                      width="64"
                      height="64"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="1.33333"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow_766_1074"
                      />
                      <feOffset dy="2.66667" />
                      <feGaussianBlur stdDeviation="5.33333" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_766_1074"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_766_1074"
                        result="shape"
                      />
                    </filter>
                  </defs>
                  <g filter="url(#filter0_d_766_1074)">
                    <circle
                      cx="32"
                      cy="30"
                      r="18"
                      stroke="white"
                      strokeWidth="4"
                      shapeRendering="crispEdges"
                    />
                  </g>
                </svg>
                )}
              </div>

              <div className="flex relative flex-col gap-8 items-start self-stretch">
                <button
                  onClick={onClose}
                  className={`flex relative flex-col gap-2.5 justify-center items-center self-stretch p-6 rounded-xl cursor-pointer transition-colors max-sm:p-5 ${
                    isCompleted 
                      ? "bg-primary hover:bg-primary/90"   
                      : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  <div className="relative text-xl font-black leading-7 text-center text-white max-sm:text-lg">
                    {isCompleted ? "작업 완료" : "취소하기"}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProgressModal.displayName = "ProgressModal";

export { ProgressModal };
