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
import { signupSchema } from "@/lib/validators";
import { handleSignUp } from "@/actions/user";
import { toast } from "sonner";
import { useUser } from "@/providers/user-provider";
import { useRouter } from "next/navigation";

type Input = z.infer<typeof signupSchema>;

export type SignupFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUpForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser } = useUser();
    const router = useRouter();

    const form = useForm<Input>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (values: Input) => {
        const formData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        }
        setIsSubmitting(true);
        
        try {
            const { data, error } = await handleSignUp(formData);
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
            
            <div className="flex gap-2">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                            <Input placeholder="First name" {...field} />
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
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                            <Input placeholder="Last name" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="m@example.com" type="email" {...field} />
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
                        <Input placeholder="Password" type="password" {...field} />
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
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                        <Input placeholder="Confirm password" type="password" {...field} />
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
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing in'
                    : 'Sign Up'}
                </Button>
            </div>
        </form>
    </Form>
  )
}

export default SignUpForm;