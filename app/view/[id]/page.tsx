import DeleteButton from '@/components/deleteButton';
import BlogViewer from '@/components/viewer';
import { getBlog } from '@/lib/api/blog';
import Link from 'next/link';

import React from 'react'

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  console.log(id, "테스트");

  const {
    data, 
    success,
  } = await getBlog(id);

  if (!success) return (<></>);

  // console.log(data)
  // const {
    // data,
    // success,
  // } = await getBlog(id);

  //에러 처리 나중에 구현
  // if (!success) return <></>
  

  return (
    <div>
      <BlogViewer {...data}/>
        <Link href={`/write/${data.id}`} >
          <button>update</button>
        </Link>
        
        <DeleteButton id={id}/>
    </div>
  )
}

export default Page 