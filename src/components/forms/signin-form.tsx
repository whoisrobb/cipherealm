"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { useState } from "react";
import { useUser } from "@/providers/user-provider";
import { toast } from "sonner";
import { signinSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { handleSignIn } from "@/actions/user";

type Input = z.infer<typeof signinSchema>;

export type SignInFormData = {
    email: string;
    password: string;
}

const SignInForm = () => {
    const { setUser } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<Input>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: 'tonystark@example.com',
            password: 'password',
        }
    });

    const onSubmit = async (values: Input) => {
        setIsSubmitting(true);
        
        try {
            const { data, error } = await handleSignIn(values);
            if (error) {
                toast.error(error);
            } else {
                setUser(data!);
                form.reset();
                router.replace('/');
            }
        } catch (error) {
            toast.error(error as string);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username or email</FormLabel>
                        <FormControl>
                            <Input placeholder="Username or email" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password" {...field} type="password" />
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2 capitalize">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Signing in'
                        : 'Sign in'}
                    </Button>
                </div>
            </form>
        </Form>
      )
    }
    
export default SignInForm