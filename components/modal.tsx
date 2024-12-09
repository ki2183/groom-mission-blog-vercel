"use client"

import React, { ReactNode, useState } from 'react'

//세트로 쓰세영
export const useModalState = () => {
    const [modalState, useModalState] = useState<boolean>(false);

    const isOpenModal = () => useModalState(true);
    const isCloseModal = () => useModalState(false);

    return {
        modalState,
        isOpenModal,
        isCloseModal,
    }
}

export default function ModalFrame(props:{
    state:boolean,
    children: ReactNode,
    isCloseModal:() => void,
}) {
    const {state, children, isCloseModal} = props

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        isCloseModal();
    }

    if (!state) return null;

    return (
        <div  
            role="dialog" 
            aria-modal="true"
            onClick={onClickHandler} 
            className='z-[100] w-screen h-screen fixed top-0 left-0 bg-[#4040404f] flex items-center justify-center'
        >
            {children}   
        </div>
    )
}
