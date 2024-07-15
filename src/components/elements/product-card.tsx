"use client";

import { Product } from "@/db/schema";
import { cn, formatCurrency } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HTMLAttributes } from "react";

type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
    product: Product,
    index: number
}

let variants = {
    initial: {
        y: 20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: -20,
        opacity: 0
    }
}

const ProductCard = ({ product, index, className }: ProductCardProps) => {
  const filledStars = Math.floor(product.rating);
  const emptyStars = 5 - filledStars;

  return (
    <AnimatePresence>
        <motion.div
            className={cn("flex flex-col justify-between overflow-hidden text-left space-y-2 hover:shadow-md hover:shadow-muted transition-shadow rounded-b-xl", className)}
            variants={variants}
            initial="initial"
            animate="animate"
            transition={{ delay: index/10 }}
            exit="exit"
        >
            <Link href={`/products/${product.productId}`} className="">
                <div className="w-full h-48 overflow-hidden">
                    <Image
                        src={`/${product.images![0]}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-md hover:scale-105 transition-transform"
                        alt=""
                    />
                </div>
            </Link>
            <div className="p-2">
                <Link href={`/products/${product.productId}`} className="flex flex-col justify-self-end">
                    <h1 className="">{product.name}</h1>
                    <p className="text-muted-foreground text-sm">{product.category}</p>

                    <div className="flex justify-between">
                        <p className="">{formatCurrency(Number(product.price))}</p>
                        <span className="flex items-center text-sm">{product.rating} <StarFilledIcon /></span>
                    </div>
                </Link>
            </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default ProductCard