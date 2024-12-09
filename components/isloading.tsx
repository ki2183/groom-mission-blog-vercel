"use client";

import Image from "next/image";
import React, { ReactNode, useState } from "react";

// 모달 상태 및 로딩 상태 관리 훅
export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOpenLoading = () => setIsLoading(true);
  const isCloseLoading = () => setIsLoading(false);

  return {
    isLoading,
    isOpenLoading,
    isCloseLoading,
  };
};

// 모달 컴포넌트
export default function LoadingFrame(props: {
  state: boolean
}) {
  const { state } = props;

  if (!state) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="z-[105] w-screen h-screen fixed top-0 left-0 bg-[#4040404f] flex items-center justify-center"
    >
     <Image alt="로딩 이미지" src="/loading.gif" width={70} height={70}/>
    </div>
  );
}
