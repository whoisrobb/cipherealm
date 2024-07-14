"use client";

import { handleDeleteSubcategory } from '@/actions/site';
import { TrashIcon } from '@radix-ui/react-icons';
import React, { useCallback } from 'react'
import { toast } from 'sonner';

const AccordionButton = ({ subcategoryId }: { subcategoryId: string }) => {
  const deleteSubcategory = useCallback(async () => {
    const { data, error } = await handleDeleteSubcategory(subcategoryId);

    if (error) {
      toast.error(error)
    } else {
      toast.success(data)
    }
  }, []);
  return (
    <button className='transition-colors rounded hover:text-[#ff4c4c]' onClick={deleteSubcategory}><TrashIcon /></button>
  )
}

export default AccordionButton
