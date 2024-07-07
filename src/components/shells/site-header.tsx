"use client";

import Link from 'next/link';
import React, { ReactNode } from 'react';
import UserButton from '../elements/user-button';
import CartSheet from '../cart/cart-sheet';
import { cn } from '@/lib/utils';
import MobileNav from '../elements/mobile-nav';
import SignInButton from '../elements/sign-in-button';
import { useUser } from '@/providers/user-provider';
import SiteLogo from '../elements/site-logo';

interface SiteHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const SiteHeader = ({ children, className }: SiteHeaderProps) => {
  const { user } = useUser();
  return (
    <header className={cn('flex z-50 justify-between items-center border-b sticky top-0 left-0 right-0 bg-background', className)}>
      <div className="flex gap-4 items-center">
        <SiteLogo />
        { children }
      </div>
      <div className="flex items-center gap-2">
        <CartSheet />

        {user && <UserButton />}

        <MobileNav />

        {!user &&
        <Link href={'/sign-in'}>
          <SignInButton />
        </Link>}
      </div>
    </header>
  )
}

export default SiteHeader
