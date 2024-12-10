"use client"

import WriteEditor from '@/components/writeEditor'
import { createBlog } from '@/lib/api/blog';
import React from 'react'

export const dynamic = "force-dynamic";

function Page() {
  const handleFoem = async (title:string, contents:string) => createBlog(title, contents)

  return (
    <main className='container-basic-setting w-screen h-screen'>
        <WriteEditor handleFoem={handleFoem} />
    </main>
  )
}

export default Page