"use client"
import { getBlog } from '@/lib/api/blog';
import { usePathname } from 'next/navigation';
import { Editor } from '@toast-ui/react-editor';
import { ApiResponse } from '@/lib/api/response';
import '@toast-ui/editor/dist/toastui-editor.css';
import ModalFrame, { useModalState } from './modal';
import React, { useEffect, useRef, useState } from 'react'
import LoadingFrame, { useLoadingState } from './isloading';
import { useRouter } from "next/navigation"; 


/*
    Toast를 사용하면 어쩌피 client side rendering을 써야함
    떄문에 서버 액션을 따로 사용하지 않고 일반적인 useState를 사용
*/

interface WriteEditorProps {
    handleFoem: (title:string, contents:string) => Promise<ApiResponse<unknown>>
}

function WriteEditor( props: WriteEditorProps ) {
    const { handleFoem } = props

    const editorRef = useRef<Editor>(null);
    const titleRef = useRef<HTMLInputElement|null>(null);
    const { modalState, isOpenModal, isCloseModal } = useModalState();
    const { isLoading, isOpenLoading, isCloseLoading} = useLoadingState();
    const [previewStyle, setPreviewStyle] = useState<"vertical" | "tab">("vertical");
    
    const router = useRouter();
    const pathname = usePathname(); 
    const id = pathname.split("/")[2];
    
    const handleGoBackAndRefresh = () => {
      router.back(); // 뒤로가기
      setTimeout(() => {
        router.refresh(); // 강제로 새로고침
      }, 100); // 뒤로가기가 완료된 후 새로고침
    };

    /* 글 생성*/
    //#region
    
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isOpenModal();
    }

    const createBlogPosting = async () => {
      if (!titleRef.current || !editorRef.current) return;

      const title = titleRef.current.value;

      const contents = editorRef.current?.getInstance().getMarkdown();   

      // title 조건 미충족
      if(title.replace(/\s/g, '').length === 0 || 0 === title.length || title.length > 20) {
          alert("제목은 0 ~ 20자 내외로 입력해주세요.");
          return;
      }

      // contents 조건 미충족
      if (contents.length === 0) {
          alert("내용을 입력해주세요.");
          return;
      }

      //로딩 처리
      await isOpenLoading();

      //API 실행
      try {
        const { success } = await handleFoem(title, contents);
        if (!success) {
          alert('server ERR 500');
          return;
        }
        
        alert('패치 완료');
        await isCloseLoading();
        // if (id) await router.push(`/view/${id}`);
        if (id) await handleGoBackAndRefresh();
        else await router.push(`/1`);

      } catch(err: unknown) {
        console.error(err);
        alert('server ERR 500');
        await isCloseLoading();
      }
      
      
    }

  //#endregion

    //화면 크기에 따라 글쓰기 모드 변환


    const handleWindowResize = () => setPreviewStyle(window.innerWidth > 1080 ? "vertical" : "tab");

    //리사이즈 이벤트 적용
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    },[previewStyle])

    //렌더링 시작 시 create페이지인지 update페이지인지 판단
    useEffect(() => {
      if (!id) return;

      (async()=>{
        const {title, contents} = (await getBlog(id)).data;
        
        if (!titleRef.current || !editorRef.current) return;

        titleRef.current.value = title;
        editorRef.current.getInstance().setMarkdown(contents);  
      })()
    },[])
  
    return (
      <>
        <form className="w-auto h-auto py-12 flex flex-col gap-4" onSubmit={onSubmitHandler}>

          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>

            <input 
              type="text"
              id="title"
              name="title"
              ref={titleRef}
              placeholder="Enter your blog title"
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
        
          <div>
            <label htmlFor="content" className="block text-sm font-medium">
              Content
            </label>
            <Editor
              ref={editorRef}
              previewStyle={previewStyle}
              height="80vh"
              initialEditType="markdown"
              useCommandShortcut={true}
              
            />
          </div>
        
      
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xl font-bold"
          >
            Save
          </button>
        </form>

        <ModalFrame state={modalState} isCloseModal={isCloseModal}>
          <div className='w-80 h-20 bg-white rounded-sm border-gray-400 flex flex-col items-center justify-center gap-3 overflow-hidden relative'>
            <div className='h-[3px] w-full bg-blue-500 absolute top-0'/>
            <span className='text-gray-600'>{id ? "글을 수정하시겠습니까?" :"글을 생성하겠습니까?"}</span>
            <div className='grid grid-cols-2 gap-6 text-gray-600'>
            <button onClick={isCloseModal} className='bg-gray-100 text-gray-500 w-16 h-7 border-[1px] border-gray-300 hover:bg-gray-300 rounded-sm'>No</button>
              <button onClick={createBlogPosting} className='bg-blue-500 text-gray-200 w-16 h-7 border-[1px] border-gray-300 hover:bg-blue-600 rounded-sm'>Yes</button>
            </div>

          </div>
        </ModalFrame>

        <LoadingFrame state={isLoading}/>
      </>
    );
}

export default WriteEditor

