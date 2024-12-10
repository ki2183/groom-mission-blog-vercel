import SavePageNumber from "@/components/savePrevPage";
import { paginateBlog } from "@/lib/api/blog";
import Link from "next/link";

export default async function Page() {
  const page = 1;

  const { data, success } = await paginateBlog(page);

  if (!success) return <div>Error loading blogs. Please try again later.</div>;

  const { result, hasNextPage, currentPage, hasPrevPage } = data;

  console.log('POSTGRES_URL_USER:', process.env.POSTGRES_URL_USER);
console.log('POSTGRES_URL_URL:', process.env.POSTGRES_URL_URL);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center pt-16 gap-2">
      <h1 className="text-2xl">Blogs - Page {currentPage}</h1>
      <ul>
        {result.map(({ id, title }) => (
          <Link key={id} href={`/view/${id}`}>
            <li>{title}</li>
          </Link>
        ))}
      </ul>

      <div className="flex flex-row gap-1 items-end">
        {hasPrevPage ? (
          <Link className="text-[0.9rem]" href={`/${currentPage - 1}`}>
            Prev
          </Link>
        ) : (
          <span className="text-gray-500 text-[0.9rem]">Prev</span>
        )}

        <span className="text-[1.1rem]">{currentPage}</span>

        {hasNextPage ? (
          <Link className="text-[0.9rem]" href={`/${currentPage + 1}`}>
            Next
          </Link>
        ) : (
          <span className="text-gray-500 text-[0.9rem]">Next</span>
        )}
      </div>

      {/* csr 현재 페이지 저장용 */}
      <SavePageNumber page={"1"} />
    </div>
  );
}
