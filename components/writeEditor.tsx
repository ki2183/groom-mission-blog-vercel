import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import React, { use, useEffect, useRef, useState } from 'react'

/*
    Toast를 사용하면 어쩌피 client side rendering을 써야함
    떄문에 서버 액션을 따로 사용하지 않고 일반적인 useState를 사용
*/

interface WriteEditorProps {
    handleFoem: (title:string, contents:string) => void
}

function WriteEditor( props: WriteEditorProps ) {
    const { handleFoem } = props

    const editorRef = useRef<Editor>(null);
    const titleRef = useRef<HTMLInputElement|null>(null);
    const [previewStyle, setPreviewStyle] = useState<"vertical" | "tab">("vertical");
    
    //title 과 contents 기반 글생성
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //ref 연결x
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

        //API 실행
        handleFoem(title, contents);

    }

    //화면 크기에 따라 글쓰기 모드 변환
    const handleWindowResize = () => setPreviewStyle(window.innerWidth > 1080 ? "vertical" : "tab");

    //리사이즈 이벤트 적용
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    },[previewStyle])

  
    return (
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
    );
}

export default WriteEditor

