"use client"

import { deleteBlog } from "@/lib/api/blog";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";


export default function DeleteButton (props:{ id:string }) {
    const { id } = props;
    const [prevPage,setPrevPage] = useState<string>("1");
    const router = useRouter();

    const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        //삭제 API
        const { success } = await deleteBlog(id);

        //삭제 실패
        if (!success) {
            alert('삭제 실패 다시시도 하세요.');
            return 
        }

        alert('삭제 완료');
        //뒤로가기 페이지 데이터 없으면 첫 페이지로 라우팅
        if (prevPage === null || isNaN(Number(prevPage))) {
            router.push(`/1`);
            return
        }
        //이전 페이지 데이터 있으면 이전 페이지로 라우팅
        router.push(`/${prevPage}`);

    }

    useEffect(()=>{
        const getPage = sessionStorage.getItem('currentPage');
        if(getPage !== null) setPrevPage(getPage);
    },[])

    return (
        <button onClick={onClickHandler}>delete</button>
    )
}