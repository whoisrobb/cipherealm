"use client";

import { deleteSubcategory } from '@/actions/site';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react'

const AccordionButton = ({ subcategoryId }: { subcategoryId: string }) => {
  return (
    <button className='transition-colors rounded hover:text-[#ff4c4c]' onClick={() => deleteSubcategory(subcategoryId)}><TrashIcon /></button>
  )
}

export default AccordionButton
