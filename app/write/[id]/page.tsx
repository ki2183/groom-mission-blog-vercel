"use client"

import WriteEditor from '@/components/writeEditor';
import { updateBlog } from '@/lib/api/blog';
import { usePathname } from 'next/navigation';

function Page() {
  const pathname = usePathname(); 
  const id = pathname.split("/")[2];

  const handleFoem = async (title:string, contents:string) => updateBlog(id ,title, contents);
  return (
    <main className='container-basic-setting w-screen h-screen'>
        <WriteEditor handleFoem={handleFoem} />
    </main>
  )
}

export default Page

//Editor떄문에 서버 컴포넌트 불가능