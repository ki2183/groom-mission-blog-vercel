
import { paginateBlog } from "@/lib/api/blog";
import Link from "next/link";

export default async function Page() {

  const page = 1;
  const pageSize = 5;
  const { data, success } = await paginateBlog(page); 

  //에러 처리 추후에 판단
  if (!success) return <></>
  
  const {
     result
  } = data;
  console.log(result)
  return (
    <div className="font-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ol className="flex flex-col gap-3">
        {result && result.length > 0 && result.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
     </ol>
    </div>
  );
}
