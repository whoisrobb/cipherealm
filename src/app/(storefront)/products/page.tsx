import { ProductsPageProps } from '@/lib/types';
import React from 'react';
import ProductsBanner from '../_components/products-banner';
import { handleFetchFilteredProducts } from '@/actions/product';
import ProductsDisplay from '../_components/products-display';

const Products = async (
    { searchParams }: ProductsPageProps
) => {
    const { data } = await handleFetchFilteredProducts(searchParams);
  return (
    <div>
        {/* {JSON.stringify(searchParams)} */}
        <ProductsBanner items={searchParams.subcategory as string || searchParams.category as string} />
        <ProductsDisplay products={data!} />
    </div>
  )
}

export default Products