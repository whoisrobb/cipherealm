"use client";

import { getCategories } from '@/actions/site';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Subcategory } from '@/db/schema';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'

type CategoryProps = {
    categoryId: string;
    title: string;
    subcategories: Subcategory[];
}

const SearchFilters = () => {
    const [categories, setCategories] = useState<CategoryProps[] | []>([]);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const priceFrom = searchParams.get('priceFrom')
    const priceTo = searchParams.get('priceTo')
    const order = searchParams.get('order')
    const orderBy = searchParams.get('orderBy')
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    
    useEffect(() => {
        fetchCategories();
    }, [])
    
    const createQueryString = useCallback(
        // ({ name, value }: { name: string, value: string }) => {
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
        
            return params.toString()
        },
        [searchParams]
    )
    
    const fetchCategories = async () => {
        const { data } = await getCategories();
        setCategories(data!);
    }

    const setPriceFrom = (value: string) => {
        router.push(pathname + '?' + createQueryString('priceFrom', value))
    }

    const setPriceTo = (value: string) => {
        router.push(pathname + '?' + createQueryString('priceTo', value))
    }
    
    const handleOrder = (value: string) => {
        router.push(pathname + '?' + createQueryString('order', value))
    }
    
    const handleOrderBy = (value: string) => {
        router.push(pathname + '?' + createQueryString('orderBy', value))
    }
    
    const handleCategory = (value: string) => {
        router.push(pathname + '?' + createQueryString('category', value))
    }
    
    const handleSubcategory = (value: string) => {
        router.push(pathname + '?' + createQueryString('subcategory', value))
    }

  return (
    <div className='space-y-4'>
        <Card>
            <CardHeader>
                <CardTitle>Price</CardTitle>
                <CardDescription>Set your price range</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        onChange={(e) => setPriceFrom(e.target.value)}
                        placeholder="Price from"
                    />
                        <span>-</span>
                    <Input
                        type="number"
                        onChange={(e) => setPriceTo(e.target.value)}
                        placeholder="Price to"
                    /> 
                </div>
            </CardContent>
        </Card>
      
        <Card>
            <CardHeader>
                <CardTitle>Order</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Select
                        onValueChange={handleOrder}
                    >
                        <SelectTrigger className="">
                            <SelectValue placeholder="Order:" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="asc">Ascending</SelectItem>
                            <SelectItem value="desc">Descending</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        onValueChange={handleOrderBy}
                    >
                        <SelectTrigger className="">
                            <SelectValue placeholder="Order By:" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="price">Price</SelectItem>
                            <SelectItem value="createdAt">Date</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
            
        <div className="grid grid-cols-2 gap-2">
            <Select
                onValueChange={handleCategory}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {categories?.map((cat) => (
                        <SelectItem value={cat.title} key={cat.categoryId}>{cat.title}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
                    
            <Select
                onValueChange={handleSubcategory}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Set sub-category" />
                </SelectTrigger>
                <SelectContent>
                    
                {categories.map((category) => (
                    <div key={category.categoryId}>
                        {category.subcategories.map((subcategory) => (
                            <SelectItem value={subcategory.title} key={subcategory.subcategoryId} className="subcategory">{subcategory.title}</SelectItem>
                        ))}
                    </div>
                ))}
                </SelectContent>
            </Select>
        </div>

        <Button
            className="w-full justify-self-end"
            onClick={() => router.push(pathname)}
        >
            Clear filters
        </Button>          
    </div>
  )
}

export default SearchFilters
