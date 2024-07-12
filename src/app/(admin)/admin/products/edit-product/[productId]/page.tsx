"use client";

import { handleFetchSingleProduct } from '@/actions/product';
import ProductForm from '@/components/forms/product-form';
import ContentShell from '@/components/shells/content-shell';
import { Product } from '@/db/schema';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const EditProduct = () => {
    const pathname = usePathname();
    const productId = pathname.split('/').slice(-1)[0];
    const [productData, setProductData] = useState<Product | null>(null);
  
    useEffect(() => {
      fetchProduct()
    }, []);
  
    const fetchProduct = async () => {
      const { data } = await handleFetchSingleProduct(productId as string);
      setProductData(data!)
    }
  return (
    <ContentShell
      title='Edit product'
      subtitle='Update or edit product data'
    >
      {productData && <ProductForm productData={productData} />}
    </ContentShell>
  )
}

export default EditProduct
