"use client";

import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

type DropdownOptionsProps = {
  // openModal: Dispatch<SetStateAction<boolean>>;
  actionFunc: () => void;
  deleteFunc: () => void;
}

const DropdownOptions = ({ actionFunc, deleteFunc }: DropdownOptionsProps) => {
    // const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={actionFunc}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteFunc}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <DropdownDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Are you sure you want to delete this product?'
      >
        <div className="">
          This action will result in permanent loss of data. Do you want to continue?
          <div className="flex gap-2">
            <Button onClick={() => {deleteFunc(); setIsOpen(false)}}>Confirm</Button>
            <Button variant={'secondary'} onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      </DropdownDialog> */}
    </>
  )
}

export default DropdownOptions
