import Component from '@/components/elements/products';
import ContentShell from '@/components/shells/content-shell';
import { buttonVariants } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import { handleFetchAllProducts } from '@/actions/product';
import ProductsTable from '@/components/elements/products-table';

const Admin = async () => {
  const { data } = await handleFetchAllProducts();
  return (
    <ContentShell
      title='Products'
      subtitle='Manage your products and view their sales performance.'
    >
      <Link
        href={'/admin/products/create-product'}
        className={buttonVariants()}
      >
        Add product
        <PlusIcon className='ml-1' />  
      </Link>

      <ProductsTable products={data!} />
    </ContentShell>
  )
}

export default Admin
