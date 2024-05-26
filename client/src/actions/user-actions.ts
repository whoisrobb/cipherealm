import { SaveUserProps } from "@/lib/types/types";
import { serverUrl } from "@/lib/utils/utils";


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

// GET SINGLE USER
// export const getUserByUsername = async (username: string) => {
//     try {
//         const user = await db.select()
//             .from(UserTable)
//             .where(eq(UserTable.username, username))

//         return user;
//     } catch (err) {
//         console.error(err);
//     }
// }