
import SavePageNumber from "@/components/savePrevPage";
import { paginateBlog } from "@/lib/api/blog";
import Link from "next/link";

export default async function Page() {

  const page = 1;
  const { data, success } = await paginateBlog(page); 

  //에러 처리 추후에 판단
  if (!success) return <div>Error loading blogs. Please try again later.</div>;
  
  const {
     result, hasNextPage,
  } = data;
  
  return (
    <div>
        <h1>Blogs - Page {1}</h1>
        <ul>
          {result.map(({ id, title }) => (
            <Link key={id} href={`/view/${id}`}>
                <li>{title}</li>
            </Link>
          ))}
        </ul>

        <div>

          {hasNextPage && (
            <Link href={`/${2}`}>Next</Link>
          )}
        </div>
        {/* csr 현재 페이지 저장용 */}
        <SavePageNumber page={"1"}/>
      </div>
  );
}
