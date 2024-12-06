"use client"

import WriteEditor from '@/components/writeEditor'
import { createBlog } from '@/lib/api/blog';
import React from 'react'

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