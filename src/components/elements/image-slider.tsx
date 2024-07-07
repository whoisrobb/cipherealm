"use client";

import { Button } from '../ui/button';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

type ImageSliderProps = {
    images: string[]
};

let variants = {
    initial: (direction: number) => ({
        x: direction * 100,
        opacity: 0
    }),
    animate: {
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        x: direction * -100,
        opacity: 0
    })
}

const ImageSlider = ({ images }: ImageSliderProps) => {
    const [count, setCount] = useState(1);
    const [tuple, setTuple] = useState([0, count]);

    if (tuple[1] !== count) {
        setTuple([tuple[1], count])
    };

    let prev = tuple[0];
    let direction = count > prev ? 1 : -1;

    const increaseCount = () => {
        if (count >= images.length) {
            setCount(0)
        }
        setCount((prevState) => prevState += 1)
    }

    const decreaseCount = () => {
        if (count <= 1) {
            setCount(images.length + 1)
        }
        setCount((prevState) => prevState -= 1)
    }
  return (
    <div className='space-y-2'>
        <div className="mt-8 flex justify center">
            <div className="flex h-[30rem] w-[30rem] items-center border relative justify-center overflow-hidden">
                <Button
                    variant={'outline'}
                    size={'icon'}
                    className='absolute size-6 rounded-full left-2 top-[50%] z-50'
                    onClick={decreaseCount}
                >
                    <ChevronLeftIcon />
                </Button>

                <AnimatePresence custom={direction}>
                    <motion.div
                        key={count}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={direction}
                        className='h-96 w-96 absolute flex items-center justify-center'
                    >
                        <Image
                            src={`/${images[count-1]}`}
                            className='object-cover'
                            height={384}
                            width={384}
                            alt='image'
                        />
                    </motion.div>

                    <Button
                        variant={'outline'}
                        size={'icon'}
                        className='absolute size-6 rounded-full right-2 top-[50%] z-50'
                        onClick={increaseCount}
                    >
                        <ChevronRightIcon />
                    </Button>
                </AnimatePresence>
            </div>
        </div>

        <div className="flex gap-2">
            {images.map((image, index) => (
                <div
                    key={index}
                    onClick={() => setCount(index + 1)}
                    className="relative cursor-pointer flex items-center justify-center"
                >
                    <div className="h-[50px] w-[50px] overflow-hidden flex rounded-sm items-center justify-center z-50">
                        <Image
                            src={`/${image}`}
                            className='object-cover'
                            height={75}
                            width={75}
                            alt='image'
                        />
                    </div>

                    {index +1 === count && <motion.div layoutId='active-image' className="absolute h-[60px] w-[60px] border-2 rounded-lg border-muted-foreground" />}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ImageSlider
