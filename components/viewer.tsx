"use client"

import { Iblog } from '@/type/blog'
import React from 'react'
import { Viewer } from '@toast-ui/react-editor';

function BlogViewer(props: Iblog) {
    const {contents} = props;
    
    return (
        <Viewer initialValue={contents}/>
    )
}

export default BlogViewer