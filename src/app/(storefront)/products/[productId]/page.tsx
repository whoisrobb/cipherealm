"use client";

import { handleFetchSingleProduct } from "@/actions/product";
import { useCart } from "@/components/cart/cart-provider";
import ImageSlider from "@/components/elements/image-slider";
import ContentShell from "@/components/shells/content-shell";
import { Button } from "@/components/ui/button";
import { type Product } from "@/db/schema";
import { formatCurrency } from "@/lib/utils";
import { MinusIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface CartProduct extends Product {
    quantity: number
}

const Product = () => {
    const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    const { productId } = useParams();
    const [productData, setProductData] = useState<Product | null>(null);

    useEffect(() => {
        getCategories();
    }, []);
    
    const getCategories = async () => {
        const { data } = await handleFetchSingleProduct(productId as string);
        setProductData(data!);
    }

    const quantity = getItemQuantity(productData?.productId as string);

    const ratingElements = Array.from({ length: productData?.rating as number }, (_, index) => (
        <StarFilledIcon key={index} />
    ));
  return (
    productData &&
    <ContentShell
        // subtitle={productData.category}
    >
        <div className="lg:flex md:flex gap-12">
            <div className="max-w-2xl w-full lg:m-0 mb-8">
                <ImageSlider images={productData.images!} />
            </div>
            <div className="w-full h-full flex flex-col gap-6">
                <div className="">
                    <h1 className="text-5xl font-bold">{productData.name}</h1>
                </div>
                <div className="">
                    <div
                        className="text-lg text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: productData.description }}
                    />
                </div>
                <div className="">
                    <h1 className="text-xl font-bold">{formatCurrency(Number(productData.price))}</h1>
                    <div className="text-yellow-400 flex items-center gap-1">
                        {ratingElements}
                    </div>
                    <div className="text-muted-foreground">
                        {productData.inventory > 0
                        ? <p>(in stock)</p>
                        : <p>(out of stock)</p>}
                    </div>
                </div>
                <div className="">
                    {quantity > 0 ?
                    <div className="flex items-center gap-2">
                        <Button variant={'outline'} size={'icon'} className="" onClick={() => decreaseQuantity(productData.productId)}><MinusIcon /></Button>
                            <div className="">{quantity}</div>
                        <Button variant={'outline'} size={'icon'} className="" onClick={() => increaseQuantity(productData.productId)}><PlusIcon /></Button>
                    </div>
                    : <Button size={'sm'} onClick={() => addToCart(productData as CartProduct)} className="w-full">Add to cart</Button>}
                </div>
            </div>
        </div>
    </ContentShell>
  )
}

export default Product