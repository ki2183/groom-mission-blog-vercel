"use client"


import Link from "next/link";

export default function Page() {
  return (
    <div className="font-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <Link href={"/write"}>가가 가가</Link>
    </div>
  );
}
