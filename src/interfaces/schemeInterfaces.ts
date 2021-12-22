import { RoleTypes } from "../types/types";

export interface Product {
    name: string;
    status: boolean;
    user: any;
    price: number;
    category: any;
    description: string;
    available: boolean;
}

export interface Category {
    name: string;
    status: boolean;
    user: any;
}

export interface Role {
    role: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    image: string;
    role: RoleTypes;
    google: boolean;
    status: boolean;
}