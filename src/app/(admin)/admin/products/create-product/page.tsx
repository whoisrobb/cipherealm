import ProductForm from '@/components/forms/product-form';
import ContentShell from '@/components/shells/content-shell';
import React from 'react'

const CreateProduct = () => {
  return (
    <ContentShell
        title='Create product'
        subtitle='Submit new product data'
    >
      <ProductForm />
    </ContentShell>
  )
}

export default CreateProduct;