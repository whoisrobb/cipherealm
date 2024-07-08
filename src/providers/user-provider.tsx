"use client";

import useLocalStorage from "@/hooks/use-local-storage";
import { User } from "@/lib/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type UserProviderProps = {
    children: ReactNode;
}

type UserContextProps = {
    user: User | null;
    setUser: (user: User) => void;
    removeUser: () => void
};

const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
    removeUser: () => {}
});

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }: UserProviderProps) => {
    const { getItem, setItem, removeItem } = useLocalStorage('authStorage');
    const userData = getItem();
    const parsedData = userData ? JSON.parse(userData) : null;
    const [user, setUserData] = useState<User | null>(parsedData);

    useEffect(() => {
        if (user) {
            setItem(user);
        }
    }, [user])

    const setUser = (user: User) => {
        setUserData(user);
    }

    const removeUser = () => {
        setUserData(null);
        removeItem();
        localStorage.removeItem("accessToken");
    }

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider;
