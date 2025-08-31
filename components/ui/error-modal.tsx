"use client";

import * as React from "react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal = React.forwardRef<HTMLDivElement, ErrorModalProps>(
  ({ isOpen, onClose }, ref) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div
          ref={ref}
          className="box-border flex justify-center items-center p-14 rounded-3xl bg-zinc-100 h-[490px] w-[512px] max-md:p-10 max-md:w-full max-md:h-auto max-md:max-w-[480px] max-md:min-h-[400px] max-sm:p-6 max-sm:m-4 max-sm:max-w-none max-sm:rounded-2xl max-sm:w-[calc(100%_-_32px)]"
        >
          <div className="flex flex-col gap-16 items-center w-[400px] max-md:gap-12 max-md:w-full max-md:max-w-[360px] max-sm:gap-10 max-sm:w-full">
            <div className="flex flex-col gap-6 items-center w-full">
              <div>
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="alert-icon"
                  style={{ width: '120px', height: '120px' }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.585 85.0001L52.875 26.0851C53.6181 24.8609 54.6641 23.8489 55.9121 23.1465C57.1601 22.4442 58.568 22.0752 60 22.0752C61.4321 22.0752 62.84 22.4442 64.0879 23.1465C65.3359 23.8489 66.3819 24.8609 67.125 26.0851L102.415 85.0001C103.142 86.2603 103.527 87.6888 103.531 89.1437C103.534 90.5986 103.157 92.0292 102.437 93.2931C101.716 94.5571 100.678 95.6105 99.4238 96.3486C98.17 97.0866 96.7448 97.4836 95.29 97.5001H24.71C23.2546 97.4851 21.8285 97.089 20.5739 96.3513C19.3192 95.6136 18.2797 94.5601 17.5589 93.2956C16.8382 92.0311 16.4613 90.5998 16.4659 89.1444C16.4705 87.6889 16.8563 86.26 17.585 85.0001ZM60 45.0001C61.3261 45.0001 62.5979 45.5269 63.5355 46.4646C64.4732 47.4022 65 48.674 65 50.0001V65.0001C65 66.3262 64.4732 67.5979 63.5355 68.5356C62.5979 69.4733 61.3261 70.0001 60 70.0001C58.6739 70.0001 57.4021 69.4733 56.4645 68.5356C55.5268 67.5979 55 66.3262 55 65.0001V50.0001C55 48.674 55.5268 47.4022 56.4645 46.4646C57.4021 45.5269 58.6739 45.0001 60 45.0001ZM55 80.0001C55 78.674 55.5268 77.4022 56.4645 76.4645C57.4021 75.5269 58.6739 75.0001 60 75.0001H60.04C61.3661 75.0001 62.6379 75.5269 63.5755 76.4645C64.5132 77.4022 65.04 78.674 65.04 80.0001C65.04 81.3262 64.5132 82.5979 63.5755 83.5356C62.6379 84.4733 61.3661 85.0001 60.04 85.0001H60C58.6739 85.0001 57.4021 84.4733 56.4645 83.5356C55.5268 82.5979 55 81.3262 55 80.0001Z"
                    fill="#DE1443"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-3 justify-center items-center w-full">
                <div className="text-3xl font-bold text-center text-neutral-600 max-md:text-3xl max-sm:text-2xl">
                  오류 발생
                </div>
                <div className="text-base font-semibold leading-6 text-center text-neutral-400 max-md:text-base max-md:leading-6 max-sm:text-sm max-sm:leading-5">
                  작업 실행 중 오류가 발생했습니다.
                  <br />
                  같은 문제가 반복된다면, 관리자에게 문의해주세요.
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="box-border flex flex-col gap-2.5 justify-center items-center p-6 w-full bg-green-600 hover:bg-green-700 rounded-xl cursor-pointer transition-colors max-md:p-5 max-sm:p-4 max-sm:rounded-lg"
            >
              <div className="text-xl leading-7 text-center text-white max-md:text-lg max-sm:text-base">
                확인
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ErrorModal.displayName = "ErrorModal";

export { ErrorModal };
