import { ReactElement } from "react";

export type MenuType = {
    id: string;
    slug: string;
    desc?: string;
    image?: string;
    title: string;
    color: string;
}[];

export type ProductType = {
    id: string;
    title: string;
    desc: string;
    image?: string;
    price: number;
    options?: { title: string, additionalPrice: number}[];
}

export type OrderType = {
    id:string;
    userEmail:string;
    price:number;
    products:CartItemType[];
    status:string;
    createdAt: Date;
    intent_id?:string;
}

export type CartItemType = {
    id:string;
    title:string;
    img?:string;
    price:number;
    optionTitle?:string;
    quantity:number;
}

export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
    
}

export type ActionType = {
    addToCart: (item: CartItemType) => void;
    removeFromCart: (item: CartItemType) => void;
    clearCart:() => void;
}