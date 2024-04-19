"use client";

import React, { useState } from 'react'
import PostInput from '../forms/post-input';
import { Button } from '../ui/button';
import { ImageIcon } from '@radix-ui/react-icons';
import { FileResponse } from '@/lib/types/types';

const CreatePost = () => {
    const [postContent, setPostContent] = useState<FileResponse[] | null>(null);
  return (
    <div className='p-2 border space-y-2'>
      <div className="flex items-center justify-between">
        <Button variant={"ghost"} size={"icon"}><ImageIcon /></Button>
        <Button variant={"outline"}>Submit</Button>
      </div>
    </div>
  )
}

export default CreatePost;