import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Product } from '@/db/schema';
import { formatCurrency, formatDate } from '@/lib/utils';
import DropdownOptions from './dropdown-options';

const ProductsTable = ({ products }: { products: Product[] }) => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                    Inventory
                </TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map((product) => (
            <TableRow>
                <TableCell className="hidden sm:table-cell">
                    {product.images &&
                    <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={`/${product.images[0]}`}
                        width="64"
                    />}
                </TableCell>
                <TableCell className="font-medium">
                    {product.name}
                </TableCell>
                <TableCell>
                    {product.inventory > 0 ?
                        <Badge variant='secondary'>Active</Badge>
                        :
                        <Badge variant="outline">Draft</Badge>
                    }
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatCurrency(Number(product.price))}</TableCell>
                <TableCell className="hidden md:table-cell">{product.inventory}</TableCell>
                <TableCell className="hidden md:table-cell">
                    {formatDate(product.createdAt)}
                </TableCell>
                <TableCell>
                    <DropdownOptions productId={product.productId} />
                </TableCell>
            </TableRow>))}
        </TableBody>
    </Table>
  )
}

export default ProductsTable
