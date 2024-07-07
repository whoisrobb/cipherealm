import React from 'react';
import StorefrontBanner from './_components/storefront-banner';
import { ProductsPageProps } from '@/lib/types';

const Home = async ({ searchParams }: ProductsPageProps) => {
  // const products = await getProducts(searchParams);
  return (
    <div className='flex flex-col items-center space-y-32'>
      <div className="h-[calc(100vh-12rem)] grid place-items-center">
        <StorefrontBanner />
      </div>
    </div>
  )
}

export default Home
