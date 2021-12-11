import { Request } from "express";
import { User } from "./schemeInterfaces";

export interface IGetTokenRequest extends Request {
    uid?: string;
    authenticatedUser?: User;
}