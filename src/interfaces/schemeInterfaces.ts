import { RoleTypes } from "../types/types";

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