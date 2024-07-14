"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { categorySchema } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleCreateCategory } from "@/actions/site";
import { toast } from "sonner";

type InputSchema = z.infer<typeof categorySchema>

const CategoryForm = () => {
    const form = useForm<InputSchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: '',
        }
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: InputSchema) => {
    const { title } = values;
    setIsSubmitting(true);
    const { data, error } = await handleCreateCategory(title)
    if (error) {
      toast.error(error)
    } else {
      toast.success(data?.title)
    }
    form.reset();
    setIsSubmitting(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Create category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting}>Submit</Button>
      </form>
    </Form>
  )
}

export default CategoryForm;