import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/forms/signup-form";

const SignUp = () => {
  return (
    // <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
     <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign up</h1>
                <p className="text-sm text-muted-foreground">
                Enter your details below to sign up for an account
                </p>
            </div>
            <div className="grid gap-4">
                <SignUpForm />

                <Button variant="outline" className="w-full">
                Login with Google
                </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline">
                Sign in
                </Link>
            </div>
            </div>
        </div>
        <div className="hidden bg-muted lg:block">
            <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
    </div>
  )
}

export default SignUp;