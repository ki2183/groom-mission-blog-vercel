import { paginateBlog } from "@/lib/api/blog";
import Link from "next/link";

export default async function Page({ params }: { params: { page: string } }) {
    const { page } = await params; // 비동기로 params를 가져옵니다.
    const pageNumber = parseInt(page, 10) || 1; // 기본값 설정
  
    const { data, success } = await paginateBlog(pageNumber);
  
    if (!success) {
      return <div>Error loading blogs. Please try again later.</div>;
    }
  
    const { result } = data;
  
    return (
      <div>
        <h1>Blogs - Page {pageNumber}</h1>
        <ul>
          {result.map(({ id, title }) => (
            <Link href={`/view/${id}`}>
                <li key={id}>{title}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
  