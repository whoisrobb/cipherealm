"use client";

import { Product } from "@/db/schema";
import useLocalStorage from "@/hooks/use-local-storage";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type CartContextValue = {
    cartItems: CartProduct[] | [];
    cartQuantity: number;
    getItemQuantity: (itemId: string) => number;
    addToCart: (item: CartProduct) => void;
    removeFromCart: (itemId: string) => void;
    increaseQuantity: (itemId: string) => void;
    decreaseQuantity: (itemId: string) => void;
}
export interface CartProduct extends Product {
    quantity: number;
}

const CartContext = createContext<CartContextValue>({
    cartItems: [],
    cartQuantity: 0,
    getItemQuantity: () => 0,
    addToCart: () => {},
    removeFromCart: () => {},
    increaseQuantity: () => {},
    decreaseQuantity: () => {},
});

interface CartProviderProps {
    children: ReactNode;
}

export const useCart = () => {
    return useContext(CartContext);
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { getItem, setItem } = useLocalStorage('cart');
    const cartString = getItem();
    const parsedCart = cartString ? JSON.parse(cartString) : [];
    const [cartItems, setCartItems] = useState<CartProduct[] | []>(parsedCart);

    useEffect(() => {
        setItem(cartItems);
    }, [cartItems])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => quantity + item.quantity, 0
    )    

    const getItemQuantity = (itemId: string) => {
        return cartItems.find(item => item.productId == itemId)?.quantity || 0
    }

    const addToCart = (item: Product) => {
        setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }])
    }

    const removeFromCart = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== itemId))
    }

    const increaseQuantity = (itemId: string) => {
        setCartItems((prevItems) => 
            prevItems.map((item) =>
                item.productId == itemId ? { ...item, quantity: item.quantity + 1 } : item
        ))
    }

    const decreaseQuantity = (itemId: string) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === itemId
                ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
                : item
            ).filter((item) => item.quantity > 0)
        )
    }

  return (
    <CartContext.Provider value={{ cartItems, cartQuantity, getItemQuantity, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider