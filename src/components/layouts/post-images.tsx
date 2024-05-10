"use client";

import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const PostImages = ({ imageUrls }: { imageUrls: string[] }) => {
    const [images, setImages] = useState(imageUrls);
    const [imageIndex, setImageIndex] = useState(0);
    const totalImages = imageUrls.length;

    const toggleRight = () => {
        setImageIndex(prev => prev += 1)

        if (imageIndex >= totalImages -1) {
         setImageIndex(0)
        }
    }

    const toggleLeft = () => {
        setImageIndex(prev => prev -= 1)

        if (imageIndex <= 0) {
         setImageIndex(totalImages -1)
        }
    }

  return (
    <div className='h-80 bg-muted overflow-hidden relative'>
        <Image
            src={imageUrls[imageIndex]}
            alt='post images'
            height={100}
            width={800}
        />
        <Button
            variant={"ghost"}
            size={"icon"}
            onClick={toggleLeft}
            className='rounded-full backdrop-filter backdrop-blur-md bg-white/10 absolute top-[50%] left-3'
        >
            <ChevronLeftIcon />
        </Button>
        <Button
            variant={"ghost"}
            size={"icon"}
            onClick={toggleRight}
            className='rounded-full backdrop-filter backdrop-blur-md bg-white/10 absolute top-[50%] right-3'
        >
            <ChevronRightIcon />
        </Button>
        <p className='rounded-md p-1 backdrop-filter backdrop-blur-md bg-white/10 absolute top-3 text-sm right-3'>
            {`${imageIndex +1}/${totalImages}`}
        </p>
    </div>
  )
}

export default PostImages
