import React from 'react'
import { Menu } from 'lucide-react'

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet'
import { Sidebar } from '@/components/Sidebar'


export const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger asChild className='pr- md:hidden'>
            <Menu  />
        </SheetTrigger>
        <SheetContent side="left" className='p-0 bg-secondary pt-10 w-30'>
            <Sidebar />
         
    </SheetContent>
    </Sheet>
  )
}

