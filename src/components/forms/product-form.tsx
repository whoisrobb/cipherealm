"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { productSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getCategories } from "@/actions/site";
import { Product } from "@/db/schema";
import ImageSlider from "../elements/image-slider";

type InputSchema = z.infer<typeof productSchema>;

type ProductFormProps = {
    productData?: Product
}

type Category = {
    categoryId: string,
    title: string,
    subcategories: {
        categoryId: string | null,
        title: string,
        description: string,
        subcategoryId: string,
    }[],
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const images = [
  '720116452_1.png',
  '720116452_2.png',
  '720116452_3.png',
  '720116452_1.png',
  '720116452_2.png',
  '720116452_3.png',
  '720116452_1.png',
  '720116452_2.png',
]

const ProductForm = ({ productData }: ProductFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const form = useForm<InputSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: productData?.name || '',
            description: productData?.description || '',
            category: productData?.category || '',
            subcategory: productData?.subcategory || '',
            price: productData?.price || '0',
            inventory: productData?.inventory.toString() || '0',
            tags: productData?.tags![0] || '',
            discount: productData?.discount.toString() || '0',
            gender: productData?.gender || ''
        }
    })
  
    useEffect(() => {
      fetchCategories();
    }, [])
  
    const fetchCategories = async () => {
        try {
            const { data, error } = await getCategories();
            if (error) {
                toast.error(error);
            } else {
                setCategories(data!);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const onSubmit = async (values: InputSchema) => {
        console.log(values)
    };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="lg:flex gap-6">
                <div className="space-y-6 w-full">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Product name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Add product name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    {/* <Textarea placeholder="Description" {...field} /> */}
                                    <ReactQuill {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-2">
                            <Select>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a size" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sizes.map((size) => (
                                        <SelectItem value={size} key={size}>{size}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='Male'>Male</SelectItem>
                                    <SelectItem value='Female'>Female</SelectItem>
                                    <SelectItem value='Unisex'>Unisex</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Price" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="inventory"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Inventory</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Inventory" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Discount (<span className="text-muted-foreground">as a percentage</span>)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Discount" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a tag" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="featured">featured</SelectItem>
                                        <SelectItem value="non-featured">non-featured</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Set category</FormLabel>
                                <FormControl>

                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem value={cat.title} key={cat.categoryId}>{cat.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subcategory"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Set sub-category</FormLabel>
                                <FormControl>

                                <Select onValueChange={field.onChange}>
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

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="mt-6 lg:mt-0">
                    <ImageSlider images={images} />
                </div>
            </div>

        <div className="flex gap-2">
            <Button disabled={isSubmitting}>Submit</Button>
            <Button variant={'secondary'} type="button">Save draft</Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm;