"use client";

import { toast } from 'sonner';

const useLocalStorage = (key: string) => {
    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

  return { getItem, setItem, removeItem };
};

export default useLocalStorage;
