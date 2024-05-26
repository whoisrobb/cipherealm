import React, { ReactNode } from 'react';

interface ContentLayoutProps {
    children: ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className='w-full max-w-[1280px]'>
        {children}      
    </div>
  )
}

export default ContentLayout;