import DeleteButton from '@/components/deleteButton';
import BlogViewer from '@/components/viewer';
import { getBlog } from '@/lib/api/blog';
import Link from 'next/link';

import React from 'react'



export default async function Page(props: { params: Promise<{ id: string }>}) {
  const id = (await props.params).id; 
  console.log(id);

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