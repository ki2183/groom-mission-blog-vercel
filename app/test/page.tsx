"use client"

import { getBlog } from '@/lib/api/blog'
import React, { useEffect } from 'react'

function Page() {

    useEffect(()=>{
        const a = async () => {
            const dto = await getBlog("38fcc51b-2320-4226-8abc-0761eab52d66");
            console.log(dto)
        }
        a();
    },[])
  return (
    <div>Page</div>
  )
}

export default Page

// 38fcc51b-2320-4226-8abc-0761eab52d66