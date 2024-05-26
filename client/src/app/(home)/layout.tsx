import LeftSidebar from '@/components/layouts/left-sidebar'
import RightSidebar from '@/components/layouts/right-sidebar'
import React, { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
        <div className="border">
            <LeftSidebar />
        </div>
        <div className="w-full col-span-2">
          {children}
        </div>
        <div className="border">
            <RightSidebar />
        </div>
    </div>
  )
}

export default HomeLayout
