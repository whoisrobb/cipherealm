import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import SearchFilters from './search-filters';

const ProductsBanner = ({ items }: { items: string | undefined }) => {
  return (
    <div className='flex justify-between'>
        <div className="">
            <h1 className='text-2xl font-bold'>Products</h1>
            <p className="text-muted-foreground">Explore our assortment of various <span className="lowercase">{items ? items : 'products'}</span> available on our store at friendly prices</p>
        </div>
        <div className="">
            <Sheet>
                <SheetTrigger>
                    <Button>Filters</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                            <SearchFilters />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    </div>
  )
}

export default ProductsBanner
