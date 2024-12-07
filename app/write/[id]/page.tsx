"use client"

import WriteEditor from '@/components/writeEditor'
import { createBlog } from '@/lib/api/blog';

function Page() {

  const handleFoem = async (title:string, contents:string) => {
    try {
      const res = await createBlog(title, contents);
      alert("Success full");
    } catch (err) {
      console.error(err);
      alert("Fail");
    }
  }

  

  return (
    <main className='container-basic-setting w-screen h-screen'>
        <WriteEditor handleFoem={handleFoem} />
    </main>
  )
}

export default Page

//Editor떄문에 서버 컴포넌트 불가능