import { SaveUserProps } from "@/lib/types/types";
import { serverUrl } from "@/lib/utils/utils";
import { auth } from "@clerk/nextjs/server";


// CREATE NEW USER
export const saveOrUpdateUser = async (userData: SaveUserProps) => {
    try {
        const response = await fetch(`${serverUrl}/users/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return 'Something went wrong!'
        }
    } catch (err) {
        console.error(err)
    }
}

// GET USER BY USERNAME
export const getUserByUsername = async (username: string) => {
    try {
        const response = await fetch(`${serverUrl}/users/${username}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

// GET USER BY EMAIL
export const getUserByEmail = async (email: string) => {
    try {
        const { getToken } = auth();
        const token = await getToken();

        const response = await fetch(`${serverUrl}/users/${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
};

// GET ALL USERS
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${serverUrl}/users`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err)
    }
};