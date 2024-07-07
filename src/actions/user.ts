"use server";

import db from "@/db/drizzle";
import { getErrorMessage, initials } from "./util";
import { UserTable } from "@/db/schema";
import { SignupFormData } from "@/components/forms/signup-form";
import { eq } from "drizzle-orm";
import { SignInFormData } from "@/components/forms/signin-form";
import jwt from "jsonwebtoken";

// SIGN UP NEW USER
export const handleSignUp = async (formData: SignupFormData) => {
    try {
        const { firstName, lastName, email, password } = formData;

        const checkUser = await getUserByEmail(email);
        if (checkUser.data) {
            return { error: 'Email already exists' }
        }

        const data = await db.insert(UserTable)
            .values({
                firstName,
                lastName,
                email,
                password,
                initials: initials(firstName, lastName)
            })
            .returning({
                userId: UserTable.userId,
                firstName: UserTable.firstName,
                lastName: UserTable.lastName,
                email: UserTable.email,
                avatar: UserTable.avatar,
                initials: UserTable.initials
            });
        
            const token = jwt.sign(
                {
                    userId: data[0].userId,
                    firstName: data[0].firstName,
                    lastName: data[0].lastName,
                    email: data[0].email,
                    avatar: data[0].avatar,
                    initials: data[0].initials
                },
                process.env.JWT_SECRET!
            );
        
        return { data: { ...data[0], token } };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}

// SIGN IN
export const handleSignIn = async (formData: SignInFormData) => {
    try {
        const { email, password } = formData;

        const user = await getUserByEmail(email);
        if (!user.data) {
            return { error: 'User does not exist' }
        };

        if (user.data.password !== password) {
            return { error: 'Invalid credentials' }
        }
        
        const token = jwt.sign(
            {
                userId: user.data.userId,
                firstName: user.data.firstName,
                lastName: user.data.lastName,
                email: user.data.email,
                avatar: user.data.avatar,
                initials: user.data.initials
            },
            process.env.JWT_SECRET!
        );

        return { data: { ...user.data, token } };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}

// GET SINGLE USER BY EMAIL
export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.query
            .UserTable
            .findFirst({
                where: eq(UserTable.email, email)
            })
        
        return { data: user };
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}

// GET ALL USERS
export const getAllUsers = async () => {
    try {
        const user = await db.query
            .UserTable
            .findMany()
        
        return {data: user};
    } catch (error) {
        return { error: getErrorMessage(error) };
    }
}