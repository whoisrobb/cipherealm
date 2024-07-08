"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const sidebarNav = ['dashboard', 'products', 'purchases', 'account', 'site']

const Sidebar = () => {
    const pathname = usePathname();

  return (
    <div className='p-4 space-y-1'>
      {sidebarNav.map((item, index) => (
        <Link
            href={`/admin/${item}`}
            key={index}
            className={cn(
            "group flex w-full items-center rounded border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
            pathname.split('/').includes(item)
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground",
            )}
        >
            <span className='capitalize'>{item}</span>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar;