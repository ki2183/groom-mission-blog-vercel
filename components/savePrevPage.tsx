"use client"

import { useEffect } from 'react'

//클라이언트 세션에 페이지 저장
function SavePageNumber(props:{ page:string }) {
    const { page } = props
    useEffect(() => {
        sessionStorage.setItem("currentPage", page.toString());
      }, [ page ]);

    return null;
}

export default SavePageNumber;