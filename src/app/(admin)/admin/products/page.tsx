import ContentShell from '@/components/shells/content-shell';
import { buttonVariants } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

const Admin = () => {
  return (
    <ContentShell
      title='Products'
      subtitle='See all the fucking products you got'
    >
      <Link
        href={'/admin/products/create-product'}
        className={buttonVariants()}
      >
        Add product
        <PlusIcon className='ml-1' />  
      </Link>
    </ContentShell>
  )
}

export default Admin
