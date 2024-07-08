import SiteHeader from '@/components/shells/site-header';
import React from 'react'
import SidebarNav from './_components/sidebar-nav';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <SiteHeader className='h-16' />
      <div className="grid lg:flex h-[calc(100vh-4rem)]">
        <aside className='border-r w-80 hidden lg:block'>
          <SidebarNav />
        </aside>
        <div className="w-full px-6 py-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout;