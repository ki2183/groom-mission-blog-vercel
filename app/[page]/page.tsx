import SavePageNumber from "@/components/savePrevPage";
import { paginateBlog } from "@/lib/api/blog";
import Link from "next/link";


export default async function Page({ params }: { params: { page: string } }) {
    const { page } = await params;
    const pageNumber = parseInt(page, 10) || 1; 
  
    const { data, success } = await paginateBlog(pageNumber);
    
    if (!success) return <div>Error loading blogs. Please try again later.</div>;
  
    const { result, hasNextPage, hasPrevPage } = data;
  
    return (
      <div>
        <h1>Blogs - Page {pageNumber}</h1>
        <ul>
          {result.map(({ id, title }) => (
            <Link key={id} href={`/view/${id}`}>
                <li>{title}</li>
            </Link>
          ))}
        </ul>

        <div>
          {hasPrevPage && (
            <Link href={`/${pageNumber - 1}`}>Previous</Link>
          )}

          {hasNextPage && (
            <Link href={`/${pageNumber + 1}`}>Next</Link>
          )}
        </div>

        {/* csr 현재 페이지 저장용 */}
        <SavePageNumber page={page}/>
      </div>
    );
  }
  